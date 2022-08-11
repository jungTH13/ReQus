import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserProfileEntity } from './entities/user-profile.entity';
import { UserRepository } from './repositories/user.repository';
import { UserProfileRepository } from './repositories/user-profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserProfileEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserProfileRepository],
  exports: [TypeOrmModule, UserRepository, UserProfileRepository]
})
export class UsersModule {}
