import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { payload } from './jwt/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user: UserEntity = await this.userRepository.findUserByEmail(email);

    if (user === null) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    const isPasswordValidated = bcrypt.compare(password, user.password);
    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    const payload: payload = { email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
