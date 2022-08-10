import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateQuestDto } from '../dto/create-quest.dto';

@Injectable()
export class CreateQuestValidationPipe implements PipeTransform {
  transform(createQuestDto: CreateQuestDto) {
    if (
      60000 <=
      createQuestDto.startTime.getTime() - createQuestDto.endTime.getTime()
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
