import { Controller, Get } from "@nestjs/common";
import { TimelineService } from "../../domain/timeline/timeline.service";
import { PostInfos } from "../../../front/src/domain/post/PostInfos";
@Controller('timeline')
export class TimelineController {
    constructor(private readonly timelineService: TimelineService) { }

    //最新10件の投稿を表示する
    @Get('v1/latest')
    async latest(): Promise<PostInfos[]> {
        return this.timelineService.latest();
    }
}
