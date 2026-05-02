import { IsEmail, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9_]{3,30}$/, {
    message: "username must be 3-30 chars, letters/numbers/underscore only",
  })
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  displayName: string;
}
