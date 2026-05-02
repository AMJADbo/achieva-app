import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";
import { AchievementCategory } from "../entities/achievement.entity";

export class QueryAchievementsDto {
  @IsOptional()
  @IsEnum(AchievementCategory)
  category?: AchievementCategory;

  @IsOptional()
  @IsString()
  authorId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 20;
}
