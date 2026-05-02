import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokensModule } from "../tokens/tokens.module";
import { AchievementsController } from "./achievements.controller";
import { AchievementsService } from "./achievements.service";
import { Achievement } from "./entities/achievement.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Achievement]), TokensModule],
  controllers: [AchievementsController],
  providers: [AchievementsService],
  exports: [AchievementsService],
})
export class AchievementsModule {}
