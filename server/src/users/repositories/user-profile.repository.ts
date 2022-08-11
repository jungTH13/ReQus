import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserProfileEntity } from '../entities/user-profile.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserProfileRepository {
  constructor(
    @InjectRepository(UserProfileEntity)
    private readonly repository: Repository<UserProfileEntity>,
  ) {}

  async findProfile(id: string): Promise<UserProfileEntity> {
    return await this.repository.findOne({ where: { userId: id } });
  }

  async updateProfile(profile: UserProfileEntity) {
    return await this.repository.save(profile)
  }
}
