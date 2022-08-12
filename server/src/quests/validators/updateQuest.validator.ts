import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateQuestDto } from '../dto/update-quest.dto';

@Injectable()
export class UpdateQuestDtoValidationPipe implements PipeTransform {
  transform(updateQuestDto: UpdateQuestDto) {
    const time = new Date();
    if (updateQuestDto.startTime < time) {
      throw new BadRequestException(
        '시작 시간이 현재 시간보다 빠를 수 없습니다.',
      );
    }
    if (
      60000 >
      updateQuestDto.endTime.getTime() - updateQuestDto.startTime.getTime()
    ) {
      throw new BadRequestException(
        '종료시간은 시작시간보다 1분이상 늦어야합니다.',
      );
    }
    if (60000 > updateQuestDto.endTime.getTime() - time.getTime()) {
      throw new BadRequestException(
        '종료시간은 시작시간보다 1분이상 늦어야합니다.',
      );
    }
    return updateQuestDto;
  }
}
