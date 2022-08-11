import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserProfileEntity } from '../entities/user-profile.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async createUser(user: UserEntity): Promise<UserEntity> {
    return await this.repository.save(user);
  }

  async findUserById(id: string): Promise<UserEntity> {
    return await this.repository.findOne({ where: { id } });
  }
  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOne({ where: { email } });
  }

  async removeUser(id: string) {
    return await this.repository.delete({ id });
  }
}
