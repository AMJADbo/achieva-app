import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  getProfile(@Param("id") id: string) {
    return this.usersService.getPublicProfile(id);
  }

  @Patch("me")
  @UseGuards(JwtAuthGuard)
  updateProfile(@CurrentUser() user: User, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(user.id, dto);
  }
}
