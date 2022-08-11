import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: any, res: any, next: () => void) {
    res.on('finish', () => {
      this.logger.log(
        `${req.ip} [${req.method} ${res.statusCode}] ${req.originalUrl}`,
      );
    });
    next();
  }
}
