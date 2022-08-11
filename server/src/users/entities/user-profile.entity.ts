import { IsString } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({
  name: 'user_profile',
  schema: 'public',
})
export class UserProfileEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsString()
  @Column('varchar', { name: 'userId', nullable: false })
  userId: string;

  @IsString()
  @Column('varchar', { name: 'name', nullable: false })
  name: string;

  @IsString()
  @Column('varchar', { name: 'nickname', nullable: false })
  nickname: string;

  @IsString()
  @Column('varchar', { name: 'address', nullable: false })
  address: string;

  @IsString()
  @Column('varchar', { name: 'image', nullable: true })
  image: string;

  @Column('int', { name: 'point' , nullable: true})
  point: number;

  @OneToOne(()=>UserEntity, (user:UserEntity)=>user.profile, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
