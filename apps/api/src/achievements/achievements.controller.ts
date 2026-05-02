import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { User } from "../users/entities/user.entity";
import { AchievementsService } from "./achievements.service";
import { CreateAchievementDto } from "./dto/create-achievement.dto";
import { QueryAchievementsDto } from "./dto/query-achievements.dto";

@Controller("achievements")
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() user: User, @Body() dto: CreateAchievementDto) {
    return this.achievementsService.create(user.id, dto);
  }

  @Get()
  findAll(@Query() query: QueryAchievementsDto) {
    return this.achievementsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.achievementsService.findOne(id);
  }

  @Post(":id/like")
  @UseGuards(JwtAuthGuard)
  like(@Param("id") id: string, @CurrentUser() user: User) {
    return this.achievementsService.like(id, user.id);
  }
}
