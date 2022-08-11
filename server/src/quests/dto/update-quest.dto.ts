import { PickType } from '@nestjs/swagger';
import { QuestEntity } from '../entities/quest.entity';

export class UpdateQuestDto extends PickType(QuestEntity, [
  'id',
  'userId',
  'category',
  'title',
  'startTime',
  'endTime',
  'infomation',
] as const) {}
