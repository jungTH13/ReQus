import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateQuestDto } from './create-quest.dto';

export class UpdateQuestDto extends PickType(CreateQuestDto, [
  'category',
  'title',
  'startTime',
  'endTime',
  'infomation',
]) {}
