import { Controller, Get, Query } from "@nestjs/common";
import { FeedService } from "./feed.service";

@Controller("feed")
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  getFeed(
    @Query("page") page?: string,
    @Query("limit") limit?: string
  ) {
    return this.feedService.getGlobalFeed(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20
    );
  }
}
