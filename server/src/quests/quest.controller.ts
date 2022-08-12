import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { QuestService } from './quest.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateQuestDtoValidationPipe } from './validators/createQuest.validator';
import { ParamCreateDto } from './dacorators/createDto.decorator';
import { ParamUpdateDto } from './dacorators/updateDto.decorator';
import { UpdateQuestDtoValidationPipe } from './validators/updateQuest.validator';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('quest')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @ApiOperation({
    summary: '새로운 퀘스트 생성',
    description: 'userId: 유저인증 정보로 덧씌어집니다.',
  })
  @ApiBody({ type: CreateQuestDto })
  @Post()
  create(
    @ParamCreateDto(CreateQuestDtoValidationPipe)
    createQuestDto: CreateQuestDto,
  ) {
    return this.questService.createQuest(createQuestDto);
  }

  @ApiOperation({ summary: '특정 퀘스트를 id로 조회' })
  @Get('id/:id')
  findOneById(@Param('id') id: string) {
    return this.questService.findQuestById(id);
  }

  @ApiOperation({ summary: '특정 퀘스트를 User정보로 조회' })
  @Get('user/:userEmail')
  findByUser(@Param('userEmail') id: string) {
    //const user = userRepository.findByEmail(userEmail)
    return this.questService.findQuestById(id);
  }

  @ApiOperation({
    summary: '퀘스트 변경',
    description: 'userId: 유저인증 정보로 덧씌어집니다.',
  })
  @ApiBody({ type: UpdateQuestDto })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @ParamUpdateDto(UpdateQuestDtoValidationPipe)
    updateQuestDto: UpdateQuestDto,
  ) {
    return this.questService.updateQuest(id, updateQuestDto);
  }

  @ApiOperation({
    summary: '퀘스트 삭제',
    description: 'userId: 유저인증 정보로 덧씌어집니다.',
  })
  @Delete(':id/:userId')
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.questService.deleteQuest(userId, id);
  }
}

/*
퀘스트의 테이블에서 왜래키를 유저의 id 가 아닌 유저의 email로 설정해야함
퀘스트를 조회 할 경우 유저의 id 정보가 같이 조회되며 해당 정보를 같이 반환할 경우
해당 퀘스트의 정보를 토대로 유저의 email를 유추할 수 있으며 이를 통한 쿠키내 jwt 변조위험이 있음
*/
