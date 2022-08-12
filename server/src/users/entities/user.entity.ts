import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserProfileEntity } from './user-profile.entity';

@Entity({
  name: 'user',
  schema: 'public',
})
export class UserEntity {
  @IsNotEmpty({ message: 'id가 반드시 필요합니다.' })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty({ message: '이메일이 필요합니다.' })
  @IsString()
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @IsNotEmpty({ message: '패스워드가 필요합니다.' })
  @IsString()
  @Column({ type: 'varchar', nullable: false, select: false })
  password: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToOne(
    () => UserProfileEntity,
    (profile: UserProfileEntity) => profile.user,
    {
      cascade: true,
    },
  )
  profile: UserProfileEntity
}
