import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateQuestDto } from '../dto/create-quest.dto';

@Injectable()
export class CreateQuestDtoValidationPipe implements PipeTransform {
  transform(createQuestDto: CreateQuestDto) {
    if (createQuestDto.startTime < new Date()) {
      throw new BadRequestException(
        '시작 시간이 현재 시간보다 빠를 수 없습니다.',
      );
    }
    if (
      60000 >
      createQuestDto.endTime.getTime() - createQuestDto.startTime.getTime()
    ) {
      throw new BadRequestException(
        '종료시간은 시작시간보다 1분이상 늦어야합니다.',
      );
    }
    if (createQuestDto.price < 1000) {
      throw new BadRequestException('최소 후원 금액은 1000원 이상부터입니다.');
    }
    if (createQuestDto.price % 100 != 0) {
      throw new BadRequestException('후원 금액의 최소 단위는 100원 입니다.');
    }
    return createQuestDto;
  }
}
