import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
  schema: 'public',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
