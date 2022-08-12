import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/utils/logger.middleware';
import { QuestEntity } from './quests/entities/quest.entity';
import { QuestModule } from './quests/quest.module';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql', //'mysql', 'sqlite', 'postgres' 등 BD 설정
    host: configService.get('DB_HOST'), // = process.env.DB_HOST
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [QuestEntity, UserEntity], //사용 테이블
    synchronize: configService.get('NODE_ENV') === 'development', //! set 'false' in production 동기화 여부(DB를 재생성한다)
    dropSchema: configService.get('NODE_ENV') === 'development',
    autoLoadEntities: true, //자동으로 entity 로드 여부
    logging:
      configService.get('NODE_ENV') === 'development' ||
      configService.get('NODE_ENV') === 'test', // production에서는 로그가 불피요
    keepConnectionAlive: true, //연결시까지 계속 시도 여부
    timezone: 'Z', //time 데이터에 대한 타임존 설정
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    QuestModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(8000),
        SECRET_KEY: Joi.string().required(),
        ADMIN_USER: Joi.string().required(),
        ADMIN_PASSWORD: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(3306),
        DB_NAME: Joi.string().default('devDatabase'),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
