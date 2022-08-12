import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateQuestDto } from './dto/create-quest.dto';
import { QuestService } from './quest.service';
import { QuestRepository } from './repositories/quest.repository';
import * as uuid from 'uuid';
import { BadRequestException } from '@nestjs/common';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { QuestEntity } from './entities/quest.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserEntity } from '../users/entities/user.entity';

describe('QuestService', () => {
  let service: QuestService;
  let questRepository: QuestRepository;

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
      providers: [QuestService, QuestRepository],
    }).compile();

    questRepository = module.get<QuestRepository>(QuestRepository);
    service = module.get<QuestService>(QuestService);
  });

  describe('createQuest', () => {
    it('정상적인 정보가 들어왔을 경우 테이블에 추가하고 해당 정보를 반환한다.', async () => {
      // Given
      const startTime = new Date();
      const endTime = new Date();
      endTime.setHours(endTime.getHours() + 1);
      const requestDto: CreateQuestDto = {
        userId: uuid.v1(),
        x: 37.42829747263545,
        y: 126.76620435615891,
        category: 1,
        title: '먼저온 사람이 가져가세요',
        price: 1000,
        infomation: '',
        startTime: startTime,
        endTime: endTime,
      };
      const questDto: QuestEntity = {
        id: uuid.v1(),
        state: true,
        creatAt: new Date(),
        updateAt: new Date(),
        user: undefined,
        ...requestDto,
      };
      jest.spyOn(questRepository, 'createQuest').mockResolvedValue(questDto);

      // When
      const result = await service.createQuest(requestDto);

      // Then
      expect(result).toEqual({ ...result, ...requestDto });
    });
    /*
    it('후원금액이 0원일때 에러를 발생시켜야 합니다.', async () => {
      const startTime = new Date();
      const endTime = new Date();
      endTime.setHours(endTime.getHours() + 1);
      const requestDto: CreateQuestDto = {
        userId: uuid.v1(),
        x: 37.42829747263545,
        y: 126.76620435615891,
        category: 1,
        title: '먼저온 사람이 가져가세요',
        price: 0,
        infomation: '',
        startTime: startTime,
        endTime: endTime,
      };

      const result = async () => {
        await service.createQuest(requestDto);
      };

      await expect(result).rejects.toThrowError(
        new BadRequestException('최소 후원 금액은 1000원 이상부터입니다.'),
      );
    });

    it('후원금액에 100원으로 정확히 나누어지지 않는 경우 에러를 발생시켜야합니다. ', async () => {
      // Given
      const startTime = new Date();
      const endTime = new Date();
      endTime.setHours(endTime.getHours() + 1);
      const requestDto: CreateQuestDto = {
        userId: uuid.v1(),
        x: 37.42829747263545,
        y: 126.76620435615891,
        category: 1,
        title: '먼저온 사람이 가져가세요',
        price: 11111,
        infomation: '',
        startTime: startTime,
        endTime: endTime,
      };

      // When
      const result = async () => {
        await service.createQuest(requestDto);
      };
      // Then
      await expect(result).rejects.toThrowError(
        new BadRequestException('후원 금액의 최소 단위는 100원 입니다.'),
      );
    });

    it('퀘스트 종료시간은 시작시간보다 1분이상 늦어야 합니다.', async () => {
      // Given
      const startTime = new Date();
      const endTime = new Date();
      endTime.setSeconds(endTime.getSeconds() + 59);
      const requestDto: CreateQuestDto = {
        userId: uuid.v1(),
        x: 37.42829747263545,
        y: 126.76620435615891,
        category: 1,
        title: '먼저온 사람이 가져가세요',
        price: 1000,
        infomation: '',
        startTime: startTime,
        endTime: endTime,
      };
      const questDto: QuestEntity = {
        id: uuid.v1(),
        state: true,
        creatAt: new Date(),
        updateAt: new Date(),
        ...requestDto,
      };

      jest.spyOn(questRepository, 'createQuest').mockResolvedValue(questDto);

      // Then
      const result = async () => {
        await service.createQuest(requestDto);
      };

      // When
      await expect(result).rejects.toThrowError(
        new BadRequestException(
          '종료시간은 시작시간보다 1분이상 늦어야합니다.',
        ),
      );
    });
    */
  });

  describe('updateQuest', () => {
    it('생성된 퀘스트의 정보를 업데이트하고 정보를 반환합니다.', async () => {
      //Given
      const startTime = new Date();
      const endTime = new Date();
      const id = uuid.v1();
      const userId = uuid.v1();
      endTime.setSeconds(endTime.getSeconds() + 59);
      const requestDto: UpdateQuestDto = {
        userId,
        category: 2,
        title: '...',
        infomation: '...',
        startTime: startTime,
        endTime: endTime,
      };

      const dbData: QuestEntity = {
        id,
        userId,
        x: 37.42829747263545,
        y: 126.76620435615891,
        category: 1,
        title: '먼저온 사람이 가져가세요',
        price: 1000,
        infomation: '',
        state: true,
        startTime: startTime,
        endTime: endTime,
        creatAt: new Date(),
        updateAt: new Date(),
        user: undefined,
      };
      const updateResponeDto = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      jest
        .spyOn(questRepository, 'updateQuest')
        .mockResolvedValue(updateResponeDto);

      jest.spyOn(questRepository, 'findQuestById').mockResolvedValue(dbData);

      // When
      const result = await service.updateQuest(id, requestDto);

      // Then
      expect(result).toEqual(updateResponeDto);
    });

    it('종료된 퀘스트의 업데이트 요청시 에러를 발생해야 합니다.', async () => {
      //Given
      const startTime = new Date();
      const endTime = new Date();
      const id = uuid.v1();
      const userId = uuid.v1();
      endTime.setSeconds(endTime.getSeconds() + 59);
      const requestDto: UpdateQuestDto = {
        userId,
        category: 2,
        title: '...',
        infomation: '...',
        startTime: startTime,
        endTime: endTime,
      };

      const dbData: QuestEntity = {
        id,
        userId,
        x: 37.42829747263545,
        y: 126.76620435615891,
        category: 1,
        title: '먼저온 사람이 가져가세요',
        price: 1000,
        infomation: '',
        state: false,
        startTime: startTime,
        endTime: endTime,
        creatAt: new Date(),
        updateAt: new Date(),
        user: undefined,
      };

      jest.spyOn(questRepository, 'findQuestById').mockResolvedValue(dbData);

      // When
      const result = async () => {
        await service.updateQuest(id, requestDto);
      };

      // Then
      await expect(result).rejects.toThrowError(
        new BadRequestException('이미 종료된 퀘스트는 수정할 수 없습니다.'),
      );
    });

    it('퀘스트 시작까지 30분이내 일경우 시작시간 변경시 에러가 발생해야 합니다.', async () => {
      // Given
      const startTime = new Date();
      const endTime = new Date();
      const id = uuid.v1();
      const userId = uuid.v1();
      endTime.setSeconds(endTime.getSeconds() + 59);
      const requestDto: UpdateQuestDto = {
        userId,
        category: 2,
        title: '...',
        infomation: '...',
        startTime: startTime,
        endTime: endTime,
      };
      const dbStartTime = new Date();
      console.log(startTime);
      const dbData: QuestEntity = {
        id,
        userId,
        x: 37.42829747263545,
        y: 126.76620435615891,
        category: 1,
        title: '먼저온 사람이 가져가세요',
        price: 1000,
        infomation: '',
        state: true,
        startTime: dbStartTime,
        endTime: endTime,
        creatAt: new Date(),
        updateAt: new Date(),
        user: undefined,
      };

      jest.spyOn(questRepository, 'findQuestById').mockResolvedValue(dbData);

      // When
      const result = async () => {
        await service.updateQuest(id, requestDto);
      };

      // Then
      await expect(result).rejects.toThrowError(
        new BadRequestException('시작시간의 변경가능 시간이 지났습니다.'),
      );
    });

    it('일치하는 퀘스트가 존재하지 않는 경우 에러를 발생시켜야 합니다.', async () => {
      // Given
      const startTime = new Date();
      const endTime = new Date();
      const id = uuid.v1();
      const userId = uuid.v1();
      endTime.setSeconds(endTime.getSeconds() + 59);
      const requestDto: UpdateQuestDto = {
        userId,
        category: 2,
        title: '...',
        infomation: '...',
        startTime: startTime,
        endTime: endTime,
      };
      console.log(startTime);

      jest.spyOn(questRepository, 'findQuestById').mockResolvedValue(null);

      // When
      const result = async () => {
        await service.updateQuest(id, requestDto);
      };

      // Then
      await expect(result).rejects.toThrowError(
        new BadRequestException('일치하는 퀘스트가 존재하지 않습니다.'),
      );
    });
    /*
    it('퀘스트 업데이트시 종료시간은 시작시간보다 1분이상 늦어야 합니다.', async () => {
      //Given
      const startTime = new Date();
      const endTime = new Date();
      const id = uuid.v1();
      const userId = uuid.v1();
      endTime.setSeconds(endTime.getSeconds() + 59);
      const requestDto: UpdateQuestDto = {
        userId,
        category: 2,
        title: '...',
        infomation: '...',
        startTime: startTime,
        endTime: endTime,
      };

      const dbData: QuestEntity = {
        id,
        userId,
        x: 37.42829747263545,
        y: 126.76620435615891,
        category: 1,
        title: '먼저온 사람이 가져가세요',
        price: 1000,
        infomation: '',
        state: false,
        startTime: startTime,
        endTime: endTime,
        creatAt: new Date(),
        updateAt: new Date(),
        user: undefined,
      };

      jest.spyOn(questRepository, 'findQuestById').mockResolvedValue(dbData);

      // When
      const result = async () => {
        await service.updateQuest(id, requestDto);
      };

      // Then
      await expect(result).rejects.toThrowError(
        new BadRequestException(
          '종료시간은 시작시간보다 1분이상 늦어야합니다.',
        ),
      );
    });
    */
  });
});
