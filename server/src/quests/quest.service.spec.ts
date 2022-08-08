import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateQuestDto } from './dto/create-quest.dto';
import { QuestService } from './quest.service';
import { QuestRepository } from './repositorys/quest.repository';
import * as uuid from 'uuid';
import { BadRequestException } from '@nestjs/common';
import { UpdateQuestDto } from './dto/update-quest.dto';

describe('QuestService', () => {
  let service: QuestService;
  let repository: QuestRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([QuestRepository])],
      providers: [QuestService],
    }).compile();

    repository = module.get<QuestRepository>(QuestRepository);
    service = module.get<QuestService>(QuestService);
  });

  describe('QuestService', () => {
    describe('createQuest', () => {
      it('정상적인 정보가 들어왔을 경우 테이블에 추가하고 해당 정보를 반환한다.', async () => {
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
        jest
          .spyOn(QuestRepository, 'createQuest')
          .mockResolvedValue(requestDto);

        const result = await service.createQuest(requestDto);

        expect(result).toEqual(requestDto);
      });

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

        const result = async () => {
          await service.createQuest(requestDto);
        };

        await expect(result).rejects.toThrowError(
          new BadRequestException('후원 금액의 최소 단위는 100원 입니다.'),
        );
      });

      it('퀘스트 종료시간은 시작시간보다 1분이상 늦어야 합니다.', async () => {
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

        const result = async () => {
          await service.createQuest(requestDto);
        };

        await expect(result).rejects.toThrowError(
          new BadRequestException(
            '종료시간은 시작시간보다 1분이상 늦어야합니다.',
          ),
        );
      });
    });

    describe('updateQuest', () => {
      it('생성된 퀘스트의 정보를 업데이트하고 변경된 정보를 반환합니다.', async () => {
        const startTime = new Date();
        const endTime = new Date();
        endTime.setSeconds(endTime.getSeconds() + 59);
        const requestDto: UpdateQuestDto = {
          category: 2,
          title: '...',
          infomation: '...',
          startTime: startTime,
          endTime: endTime,
        };

        const dbDate = {
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

        jest
          .spyOn(QuestRepository, 'updateQuest')
          .mockResolvedValue(requestDto);

        jest.spyOn(QuestRepository, 'findQuest').mockResolvedValue(dbDate);

        const result = await service.updateQuest(requestDto);

        expect(result).toEqual({
          userId: uuid.v1(),
          x: 37.42829747263545,
          y: 126.76620435615891,
          price: 1000,
          ...requestDto,
        });
      });

      it('종료된 퀘스트의 업데이트 요청시 에러를 발생해야 합니다.', async () => {
        const startTime = new Date();
        const endTime = new Date();
        endTime.setSeconds(endTime.getSeconds() + 59);
        const requestDto: UpdateQuestDto = {
          category: 2,
          title: '...',
          infomation: '...',
          startTime: startTime,
          endTime: endTime,
        };

        const dbDate = {
          userId: uuid.v1(),
          x: 37.42829747263545,
          y: 126.76620435615891,
          category: 1,
          title: '먼저온 사람이 가져가세요',
          price: 1000,
          infomation: '',
          state: false,
          startTime: startTime,
          endTime: endTime,
        };

        jest.spyOn(QuestRepository, 'findQuest').mockResolvedValue(dbDate);

        const result = async () => {
          await service.updateQuest(requestDto);
        };

        await expect(result).rejects.toThrowError(
          new BadRequestException('이미 종료된 퀘스트는 수정할 수 없습니다.'),
        );
      });
    });
  });
});
