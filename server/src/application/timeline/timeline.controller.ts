import { Controller, Get } from "@nestjs/common";
import { TimelineService } from "../../domain/timeline/timeline.service";
import { Post as PostItem } from "../../domain/entities/post.entity";
@Controller('timeline')
export class TimelineController {
    constructor(private readonly timelineService: TimelineService) { }

    //最新10件の投稿を表示する
    @Get('v1/latest')
    async latest(): Promise<PostItem[]> {
        return this.timelineService.latest();
    }
}
