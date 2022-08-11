import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {

    @IsString()
    public nickname: string;
  
    @IsString()
    public address: string;

    @IsString()
    public image: string
  }
