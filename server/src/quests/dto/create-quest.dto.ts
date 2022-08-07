import { PickType } from '@nestjs/mapped-types';
import { QuestEntity } from '../entities/quest.entity';

export class CreateQuestDto extends PickType(QuestEntity, [
  'x',
  'y',
  'category',
  'title',
  'price',
  'startTime',
  'endTime',
  'infomation',
] as const) {}
