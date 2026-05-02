import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { InjectRedis } from "../tokens/redis.decorator";
import Redis from "ioredis";

const LEADERBOARD_KEY = "leaderboard";
const TOP_N = 100;

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRedis()
    private readonly redis: Redis
  ) {}

  async getTop(limit = 20) {
    const count = Math.min(limit, TOP_N);
    const raw = await this.redis.zrevrange(
      LEADERBOARD_KEY,
      0,
      count - 1,
      "WITHSCORES"
    );

    const entries: Array<{ userId: string; tokens: number }> = [];
    for (let i = 0; i < raw.length; i += 2) {
      entries.push({ userId: raw[i], tokens: parseInt(raw[i + 1], 10) });
    }

    if (entries.length === 0) return [];

    const users = await this.usersRepo.findBy({
      id: In(entries.map((e) => e.userId)),
    });

    const userMap = new Map(users.map((u) => [u.id, u]));

    return entries.map((e, index) => ({
      rank: index + 1,
      tokens: e.tokens,
      user: userMap.get(e.userId),
    }));
  }

  async getRank(userId: string) {
    const rank = await this.redis.zrevrank(LEADERBOARD_KEY, userId);
    const score = await this.redis.zscore(LEADERBOARD_KEY, userId);
    return {
      rank: rank !== null ? rank + 1 : null,
      tokens: score ? parseInt(score, 10) : 0,
    };
  }
}
