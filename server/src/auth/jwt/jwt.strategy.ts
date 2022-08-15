import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { payload } from './jwt.payload';
import { UserRepository } from 'src/users/repositories/user.repository';
import { jwtExtractorFromCookieOrHeader } from './jwt.fromExtractor';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        jwtExtractorFromCookieOrHeader,
      ]),
      ignoreExpiration: false,
      secretOrKey: 'test',
    });
  }

  async validate(payload: payload) {
    try {
      const user = this.userRepository.findUserById(payload.sub);
      if (user) {
        return user;
      } else {
        throw new UnauthorizedException('접근 오류, 인증에 실패했습니다.');
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
