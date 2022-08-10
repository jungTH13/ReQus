import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestDto } from '../dto/create-quest.dto';
import { UpdateQuestDto } from '../dto/update-quest.dto';
import { QuestEntity } from '../entities/quest.entity';

@Injectable()
export class QuestRepository {
  constructor(
    @InjectRepository(QuestEntity)
    private readonly repository: Repository<QuestEntity>,
  ) {}

  async createQuest(createQuestDto: CreateQuestDto): Promise<QuestEntity> {
    return await this.repository.save(createQuestDto);
  }

  async findQuestById(id: string): Promise<QuestEntity> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async updateQuest(updateQuestDto: UpdateQuestDto): Promise<boolean> {
    const { id, userId, category, title, startTime, endTime, infomation } =
      updateQuestDto;
    await this.repository.update(
      {
        id,
        userId,
      },
      {
        category,
        title,
        startTime,
        endTime,
        infomation,
      },
    );
    return true;
  }
}
