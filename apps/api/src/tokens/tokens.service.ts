import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import Redis from "ioredis";
import { InjectRedis } from "./redis.decorator";

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRedis()
    private readonly redis: Redis
  ) {}

  async reward(userId: string, amount: number, reason: string) {
    await this.usersRepo.increment({ id: userId }, "tokens", amount);
    const user = await this.usersRepo.findOne({ where: { id: userId }, select: ["id", "tokens"] });
    if (user) {
      await this.redis.zadd("leaderboard", user.tokens, userId);
    }
  }

  async getBalance(userId: string): Promise<number> {
    const user = await this.usersRepo.findOne({
      where: { id: userId },
      select: ["tokens"],
    });
    return user?.tokens ?? 0;
  }
}
