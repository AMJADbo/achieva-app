import { IsIn, IsString } from "class-validator";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "video/mp4"];

export class PresignDto {
  @IsString()
  filename: string;

  @IsIn(ALLOWED_TYPES)
  contentType: string;
}
