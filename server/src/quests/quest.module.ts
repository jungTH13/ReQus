import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestRepository } from './repositories/quest.repository';
import { QuestEntity } from './entities/quest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestEntity])],
  controllers: [QuestController],
  providers: [QuestService, QuestRepository],
  exports: [TypeOrmModule, QuestRepository],
})
export class QuestModule {}
