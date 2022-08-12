import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfileEntity } from './entities/user-profile.entity';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { UserProfileRepository } from './repositories/user-profile.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const userProfile = new UserProfileEntity();
    userProfile.address = createUserDto.address;
    userProfile.name = createUserDto.name;
    userProfile.nickname = createUserDto.nickname;
    userProfile.point = 0;

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    const user = new UserEntity();
    user.email = createUserDto.email;
    user.password = hashedPassword;
    user.profile = userProfile;

    const savedUser = await this.userRepository.createUser(user);
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async findOne(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userProfile = await this.userProfileRepository.findProfile(id);
    userProfile.nickname = updateUserDto.nickname;
    userProfile.image = updateUserDto.image;
    userProfile.address = updateUserDto.address;
    return await this.userProfileRepository.updateProfile(userProfile);
  }

  async remove(id: string) {
    return await this.userRepository.removeUser(id);
  }
}
