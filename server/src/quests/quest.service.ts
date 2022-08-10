import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { QuestEntity } from './entities/quest.entity';
import { QuestRepository } from './repositories/quest.repository';

@Injectable()
export class QuestService {
  constructor(private readonly questRepository: QuestRepository) {}

  async createQuest(createQuestDto: CreateQuestDto) {
    this.createQuestValidation(createQuestDto);
    return await this.questRepository.createQuest(createQuestDto);
  }

  findAll() {
    return `This action returns all quest`;
  }

  async findQuestById(id: string) {
    const result = await this.questRepository.findQuestById(id);
    if (!result) {
      throw new NotFoundException('일치하는 퀘스트가 존재하지 않습니다.');
    }
    return result;
  }

  async updateQuest(updateQuestDto: UpdateQuestDto) {
    this.updateQuestValidation(updateQuestDto);
    const time = new Date();
    time.setMinutes(time.getMinutes() - 30);
    const quest: QuestEntity = await this.findQuestById(updateQuestDto.id);
    if (!quest.state) {
      throw new BadRequestException('이미 종료된 퀘스트는 수정할 수 없습니다.');
    }
    if (
      updateQuestDto.startTime.getTime() != quest.startTime.getTime() &&
      time.getTime() < quest.startTime.getTime()
    ) {
      throw new BadRequestException('시작시간의 변경가능 시간이 지났습니다.');
    }

    const result = await this.updateQuest(updateQuestDto);
    if (!result) {
      throw new UnprocessableEntityException('퀘스트 업데이트에 실패했습니다.');
    }

    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} quest`;
  }

  createQuestValidation(createQuestDto: CreateQuestDto) {
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
  }
  updateQuestValidation(updateQuestDto: UpdateQuestDto) {
    if (
      60000 <=
      updateQuestDto.startTime.getTime() - updateQuestDto.endTime.getTime()
    ) {
      throw new BadRequestException(
        '종료시간은 시작시간보다 1분이상 늦어야합니다.',
      );
    }
  }
}
