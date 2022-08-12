import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
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
    return await this.repository.save(createQuestDto).then((res) => {
      delete res.userId;
      return res;
    });
  }

  async findQuestById(id: string): Promise<QuestEntity> {
    return await this.repository.findOne({
      select: [
        'id',
        'category',
        'x',
        'y',
        'title',
        'price',
        'state',
        'infomation',
        'startTime',
        'endTime',
      ],
      where: {
        id,
      },
    });
  }

  async findQuestByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<QuestEntity> {
    const result = await this.repository.findOne({
      select: [
        'id',
        'category',
        'x',
        'y',
        'title',
        'price',
        'state',
        'infomation',
        'startTime',
        'endTime',
      ],
      where: {
        id,
        userId,
      },
    });

    return result;
  }

  async updateQuest(
    id: string,
    updateQuestDto: UpdateQuestDto,
  ): Promise<UpdateResult> {
    const { userId, category, title, startTime, endTime, infomation } =
      updateQuestDto;
    return await this.repository.update(
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
  }

  async deleteQuest(id: string) {
    return this.repository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
