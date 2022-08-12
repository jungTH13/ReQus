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

  //퀘스트 생성
  async createQuest(createQuestDto: CreateQuestDto) {
    return await this.questRepository.createQuest(createQuestDto);
  }

  findAll() {
    return `This action returns all quest`;
  }
  //퀘스트 찾기
  async findQuestById(id: string) {
    const result = await this.questRepository.findQuestById(id);
    if (!result) {
      throw new NotFoundException('일치하는 퀘스트가 존재하지 않습니다.');
    }
    return result;
  }

  //퀘스트 정보 업데이트
  async updateQuest(id: string, updateQuestDto: UpdateQuestDto) {
    const time = new Date();
    time.setMinutes(time.getMinutes() + 30);

    //해당 퀘스트를 조회하고 유효성 검사
    const quest: QuestEntity = await this.questRepository.findQuestById(id);
    if (!quest) {
      throw new BadRequestException('일치하는 퀘스트가 존재하지 않습니다.');
    }
    if (!quest.state) {
      throw new BadRequestException('이미 종료된 퀘스트는 수정할 수 없습니다.');
    }
    if (
      updateQuestDto.startTime.getTime() != quest.startTime.getTime() &&
      time.getTime() > quest.startTime.getTime()
    ) {
      throw new BadRequestException('시작시간의 변경가능 시간이 지났습니다.');
    }

    //퀘스트의 정보를 변경
    const result = await this.questRepository.updateQuest(id, updateQuestDto);
    if (result.affected !== 1) {
      throw new UnprocessableEntityException('퀘스트 업데이트에 실패했습니다.');
    }
    return result;
  }

  //퀘스트 삭제
  async deleteQuest(userId: string, questId: string) {
    const quest = await this.questRepository.findQuestByIdAndUserId(
      questId,
      userId,
    );
    console.log('******', quest);
    if (!quest) {
      throw new BadRequestException(
        '삭제하는 퀘스트의 생성자와 요청자가 일치하지 않습니다.',
      );
    }
    if (quest.state === false) {
      throw new BadRequestException('삭제할 수 없는 퀘스트 입니다.');
    }
    quest.startTime.setMinutes(quest.startTime.getMinutes() - 30);
    if (quest.startTime < new Date()) {
      throw new BadRequestException(
        '시작시간까지 30분 이내인 경우 삭제할 수 없습니다.',
      );
    }

    return await this.questRepository.deleteQuest(questId);
  }
}
