import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'quest',
})
export class QuestEntity {
  @IsNotEmpty({ message: 'id가 반드시 필요합니다.' })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty({ message: '생성 유저의 id가 필요합니다.' })
  @ManyToOne(() => UserEntity, (author: UserEntity) => author.id)
  userId: string;

  @ApiProperty({
    example: '48.1234',
    description: '위도 좌표',
    required: true,
  })
  @IsNotEmpty({ message: '좌표 정보가 필요합니다.' })
  @IsNumber()
  @Column({ type: 'double', nullable: false })
  x: number;

  @ApiProperty({
    example: '126.1234',
    description: '경도 좌표',
    required: true,
  })
  @IsNotEmpty({ message: '좌표 정보가 필요합니다.' })
  @IsNumber()
  @Column({ type: 'double', nullable: false })
  y: number;

  @ApiProperty({
    example: '1',
    description:
      '퀘스트 타입(1: 기본 단일 미션, 2: 다중 조건 미션, 레이싱형 다중 위치 미션)\
       * 해당 번호의 음수가 될 경우 해당 퀘스트 타입의 프라빗 미션 *',
    required: true,
  })
  @Column({ type: 'int', nullable: false, default: 1 })
  category: number;

  @ApiProperty({
    example: '인증샷 찍기',
    description: '해당 퀘스트를 대표하는 제목을 작성해 주세요',
    required: true,
  })
  @IsNotEmpty({ message: '제목을 작성해 주세요' })
  @IsString()
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ApiProperty({
    example: '10000',
    description: '달성자를 위한 기부 금액(최저:1000, 기본단위:100)(원)',
    required: true,
  })
  @IsNotEmpty({ message: '금액을 설정해 주세요' })
  @IsNumber()
  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'boolean', nullable: false })
  state: boolean;

  @ApiProperty({
    example: '제일 먼저 수령하는 사람이 가져가세요',
    description: '해당 퀘스트에 대한 완료 조건을 작성해 주세요',
  })
  @Column({ type: 'text' })
  infomation: string;

  @ApiProperty({
    example: 'Date()',
    description: '해당 퀘스트 마커의 활성화 시간을 작성해주세요',
  })
  @Column({ default: () => 'NOW()' })
  startTime: Date;

  @ApiProperty({
    example: 'Date()',
    description: '해당 퀘스트 마커의 비활성화 시간을 작성해주세요',
  })
  @Column()
  endTime: Date;

  @CreateDateColumn()
  creatAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
