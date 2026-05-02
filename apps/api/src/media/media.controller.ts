import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { User } from "../users/entities/user.entity";
import { PresignDto } from "./dto/presign.dto";
import { MediaService } from "./media.service";

@Controller("media")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post("presign")
  @UseGuards(JwtAuthGuard)
  presign(@CurrentUser() user: User, @Body() dto: PresignDto) {
    return this.mediaService.getPresignedUrl(user.id, dto);
  }
}
