import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestRepository } from './repositorys/quest.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestRepository])],
  controllers: [QuestController],
  providers: [QuestService],
  exports: [TypeOrmModule],
})
export class QuestModule {}
