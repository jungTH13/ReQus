import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { QuestService } from './quest.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateQuestDtoValidationPipe } from './validators/createQuest.validator';
import { ParamCreateDto } from './dacorators/createDto.decorator';
import { ParamUpdateDto } from './dacorators/updateDto.decorator';
import { UpdateQuestDtoValidationPipe } from './validators/updateQuest.validator';

@Controller('quest')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @ApiOperation({ summary: '새로운 퀘스트 생성' })
  @ApiBody({ type: CreateQuestDto })
  @Post('create')
  create(
    @ParamCreateDto(new CreateQuestDtoValidationPipe())
    createQuestDto: CreateQuestDto,
  ) {
    return this.questService.createQuest(createQuestDto);
  }

  @Get()
  findAll() {
    return this.questService.findAll();
  }

  @ApiOperation({ summary: '특정 퀘스트를 id로 조회' })
  @Get('id/:id')
  findOneById(@Param('id') id: string) {
    return this.questService.findQuestById(id);
  }

  @ApiOperation({ summary: '특정 퀘스트를 User정보로 조회' })
  @Get('user/:userId')
  findByUser(@Param('userId') id: string) {
    return this.questService.findQuestById(id);
  }

  @ApiOperation({ summary: '퀘스트 설정 변경' })
  @ApiBody({ type: UpdateQuestDto })
  @Post('update')
  update(
    @ParamUpdateDto(new UpdateQuestDtoValidationPipe())
    updateQuestDto: UpdateQuestDto,
  ) {
    return this.questService.updateQuest(updateQuestDto);
  }
}

/*
퀘스트의 테이블에서 왜래키를 유저의 id 가 아닌 유저의 email로 설정해야함
퀘스트를 조회 할 경우 유저의 id 정보가 같이 조회되며 해당 정보를 같이 반환할 경우
해당 퀘스트의 정보를 토대로 유저의 email를 유추할 수 있으며 이를 통한 쿠키내 jwt 변조위험이 있음
*/
