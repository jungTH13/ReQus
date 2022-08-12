import { Test, TestingModule } from '@nestjs/testing';
import { CreateQuestDto } from './dto/create-quest.dto';
import { QuestController } from './quest.controller';
import { QuestService } from './quest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestEntity } from './entities/quest.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { QuestRepository } from './repositories/quest.repository';
import { UserEntity } from '../users/entities/user.entity';
import { UpdateQuestDto } from './dto/update-quest.dto';

describe('QuestController', () => {
  let controller: QuestController;
  let questService: QuestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [QuestEntity, UserEntity],
          synchronize: true, //! set 'false' in production 동기화 여부(DB를 재생성한다)
          dropSchema: true,
          namingStrategy: new SnakeNamingStrategy(),
        }),
        TypeOrmModule.forFeature([QuestEntity]),
      ],
      controllers: [QuestController],
      providers: [QuestService, QuestRepository],
    }).compile();

    controller = module.get<QuestController>(QuestController);
    questService = module.get<QuestService>(QuestService);
  });

  // commonGiven
  const startTime = new Date();
  const endTime = new Date();
  endTime.setHours(endTime.getHours() + 1);
  const requestDto: CreateQuestDto = {
    userId: '5280c590-19fb-11ed-9358-49e25a35fd59',
    x: 37.42829747263545,
    y: 126.76620435615891,
    category: 1,
    title: '먼저온 사람이 가져가세요',
    price: 0,
    infomation: '',
    startTime: startTime,
    endTime: endTime,
  };
  const updateDto: UpdateQuestDto = {
    userId: '5280c590-19fb-11ed-9358-49e25a35fd59',
    category: 1,
    title: '인증샷 찍기',
    infomation: '제일 먼저 수령하는 사람이 가져가세요',
    startTime: startTime,
    endTime: endTime,
  };
  const questDto: QuestEntity = {
    id: '8520ebd8-3132-4d98-934b-380c32ae77d4',
    state: true,
    creatAt: new Date(),
    updateAt: new Date(),
    user: undefined,
    ...requestDto,
  };
  const updateResponeDto = {
    generatedMaps: [],
    raw: [],
    affected: 1,
  };

  describe('create', () => {
    it('정상적인 요청이 들어왓을 경우 service로 보내고 반환값을 전달해야한다.', async () => {
      // Given
      jest.spyOn(questService, 'createQuest').mockResolvedValue(questDto);

      //When
      const result = await controller.create(requestDto);

      // Then
      expect(result).toEqual(questDto);
    });
  });

  describe('findOneById', () => {
    it('정상적인 요청이 들어왓을 경우 service로 보내고 반환값을 전달해야한다.', async () => {
      // Given
      const questId = '8520ebd8-3132-4d98-934b-380c32ae77d4';
      jest.spyOn(questService, 'findQuestById').mockResolvedValue(questDto);

      //When
      const result = await controller.findOneById(questId);

      // Then
      expect(result).toEqual(questDto);
    });
  });

  describe('update', () => {
    it('정상적인 요청이 들어왓을 경우 service로 보내고 반환값을 전달해야한다.', async () => {
      // Given
      const questId = '8520ebd8-3132-4d98-934b-380c32ae77d4';
      jest
        .spyOn(questService, 'updateQuest')
        .mockResolvedValue(updateResponeDto);

      //When
      const result = await controller.update(questId, updateDto);

      // Then
      expect(result).toEqual(updateResponeDto);
    });
  });

  describe('delete', () => {
    it('정상적인 요청이 들어왓을 경우 service로 보내고 반환값을 전달해야한다.', async () => {
      // Given
      const questId = '8520ebd8-3132-4d98-934b-380c32ae77d4';
      const userId = '5280c590-19fb-11ed-9358-49e25a35fd59';
      jest
        .spyOn(questService, 'deleteQuest')
        .mockResolvedValue(updateResponeDto);

      //When
      const result = await controller.delete(questId, userId);

      // Then
      expect(result).toEqual(updateResponeDto);
    });
  });
});
