import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TimelineService } from '../../domain/timeline/timeline.service';
import { PostInfos } from '../../../front/src/domain/post/PostInfos';
import { SearchPostParamsDto } from '../../../front/src/domain/post/SearchPostParamsDto';
import { AuthGuard } from '@nestjs/passport';
@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  //最新10件の投稿を表示する
  @Get('v1/latest')
  @UseGuards(AuthGuard('jwt'))
  async latest(@Query() params: SearchPostParamsDto): Promise<PostInfos[]> {
    return this.timelineService.latest(params);
  }
}
