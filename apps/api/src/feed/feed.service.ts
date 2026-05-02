import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Achievement } from "../achievements/entities/achievement.entity";

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementsRepo: Repository<Achievement>
  ) {}

  async getGlobalFeed(page = 1, limit = 20) {
    const [data, total] = await this.achievementsRepo.findAndCount({
      relations: ["author"],
      order: { createdAt: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, meta: { page, limit, total } };
  }
}
