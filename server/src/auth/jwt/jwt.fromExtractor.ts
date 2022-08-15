import { Request } from 'express';
import { JwtFromRequestFunction } from 'passport-jwt';

export const jwtExtractorFromCookieOrHeader: JwtFromRequestFunction = (
  request: Request,
): string | null => {
  // jwt 토큰을 cookie와 header의 authorization에서 찾는다
  try {
    console.log(request.headers);
    const authorization = request.headers.authorization.split(' ');
    if (authorization && authorization[0] === 'Bearer') {
      return authorization[1];
    }
    throw new Error();
  } catch (error) {
    const jwt = request.signedCookies['jwt'];
    return jwt;
  }
};
