import { PickType } from '@nestjs/mapped-types';
import { QuestEntity } from '../entities/quest.entity';

export class UpdateQuestDto extends PickType(QuestEntity, [
  'id',
  'userId',
  'category',
  'title',
  'startTime',
  'endTime',
  'infomation',
]) {}
