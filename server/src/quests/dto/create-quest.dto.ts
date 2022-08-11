import { PickType } from '@nestjs/swagger';
import { QuestEntity } from '../entities/quest.entity';

export class CreateQuestDto extends PickType(QuestEntity, [
  'userId',
  'x',
  'y',
  'category',
  'title',
  'price',
  'startTime',
  'endTime',
  'infomation',
] as const) {}
