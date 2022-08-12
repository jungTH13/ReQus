import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public name: string;

  @IsString()
  public nickname: string;

  @IsString()
  public address: string;
}
