import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import Redis from "ioredis";
import { User } from "../users/entities/user.entity";
import { REDIS_CLIENT } from "./redis.decorator";
import { TokensService } from "./tokens.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new Redis(config.getOrThrow<string>("REDIS_URL")),
    },
    TokensService,
  ],
  exports: [TokensService, REDIS_CLIENT],
})
export class TokensModule {}
