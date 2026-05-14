import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TokensService } from "../tokens/tokens.service";
import { CreateAchievementDto } from "./dto/create-achievement.dto";
import { QueryAchievementsDto } from "./dto/query-achievements.dto";
import { Achievement } from "./entities/achievement.entity";

const TOKENS_ON_CREATE = 1;
const TOKENS_ON_LIKE = 1;

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(Achievement)
    private readonly repo: Repository<Achievement>,
    private readonly tokensService: TokensService
  ) {}

  async create(authorId: string, dto: CreateAchievementDto) {
    const achievement = this.repo.create({
      ...dto,
      authorId,
      mediaUrls: dto.mediaUrls ?? [],
    });
    const saved = await this.repo.save(achievement);
    await this.tokensService.reward(authorId, TOKENS_ON_CREATE, saved.id);
    return saved;
  }

  async findAll(query: QueryAchievementsDto) {
    const { category, authorId, page = 1, limit = 20 } = query;
    const qb = this.repo
      .createQueryBuilder("a")
      .leftJoinAndSelect("a.author", "author")
      .orderBy("a.createdAt", "DESC")
      .skip((page - 1) * limit)
      .take(limit);

    if (category) qb.andWhere("a.category = :category", { category });
    if (authorId) qb.andWhere("a.authorId = :authorId", { authorId });

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { page, limit, total } };
  }

  async findOne(id: string) {
    const achievement = await this.repo.findOne({
      where: { id },
      relations: ["author"],
    });
    if (!achievement) throw new NotFoundException("Achievement not found");
    return achievement;
  }

  async like(id: string, likerId: string) {
    const achievement = await this.findOne(id);
    await this.repo.increment({ id }, "likesCount", 1);
    await this.tokensService.reward(achievement.authorId, TOKENS_ON_LIKE, id);
    return { liked: true, likesCount: achievement.likesCount + 1 };
  }
}
