import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { User } from "../users/entities/user.entity";
import { LeaderboardService } from "./leaderboard.service";

@Controller("leaderboard")
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  getTop(@Query("limit") limit?: string) {
    return this.leaderboardService.getTop(limit ? parseInt(limit, 10) : 20);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  getMyRank(@CurrentUser() user: User) {
    return this.leaderboardService.getRank(user.id);
  }

  @Get(":userId")
  getUserRank(@Param("userId") userId: string) {
    return this.leaderboardService.getRank(userId);
  }
}
