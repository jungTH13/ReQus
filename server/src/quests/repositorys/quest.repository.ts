import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuestEntity } from '../entities/quest.entity';

@Injectable()
export class QuestRepository extends Repository<QuestEntity> {}
