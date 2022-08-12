import { PickType } from '@nestjs/swagger';
import { QuestEntity } from '../entities/quest.entity';

export class UpdateQuestDto extends PickType(QuestEntity, [
  'userId',
  'category',
  'title',
  'startTime',
  'endTime',
  'infomation',
] as const) {}
