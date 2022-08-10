import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { QuestService } from './quest.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';

@Controller('quest')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @Post('/create')
  create(@Body() createQuestDto: CreateQuestDto) {
    return this.questService.createQuest(createQuestDto);
  }

  @Get()
  findAll() {
    return this.questService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.questService.findQuestById(id);
  }

  @Post('/update')
  update(@Body() updateQuestDto: UpdateQuestDto) {
    return this.questService.updateQuest(updateQuestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questService.remove(+id);
  }
}
