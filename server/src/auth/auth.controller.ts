import { Body, Controller, Get, Post, Redirect, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '유저 로그인',
  })
  @Post('login')
  async logIn(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(loginUserDto);
    const jwt: string = await this.authService.jwtLogIn(loginUserDto);
    response.cookie('jwt', jwt, {
      httpOnly: true,
      maxAge: 60 * 1000 * 60 * 24 * 365,
      signed: true,
    });
    return jwt;
  }

  @ApiOperation({
    summary: '유저 로그아웃',
  })
  @Redirect('', 301)
  @Get('logout')
  async logOut(@Res({ passthrough: true }) response: Response) {
    response.cookie('jwt', '', {
      httpOnly: true,
      maxAge: 0,
      signed: true,
    });
    return {};
  }
}
