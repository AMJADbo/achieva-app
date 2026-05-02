import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Achievement } from "../achievements/entities/achievement.entity";
import { FeedController } from "./feed.controller";
import { FeedService } from "./feed.service";

@Module({
  imports: [TypeOrmModule.forFeature([Achievement])],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
