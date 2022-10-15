import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Authentication } from '@shared/middleware/authen.middleware';
import { AppController } from '@module/system/app.controller';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigService } from '@shared/config/config.service';
import { KafkaModule, RedisCacheModule } from '@shared/modules';
import { ConfigModule as AppConfig } from '@shared/config';

@Module({
  imports: [
    AppConfig,
    CacheModule.register({
      ttl: 9000, // seconds
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getMongoConfig(),
    }),
    ConfigModule.forRoot(),
    KafkaModule,
    RedisCacheModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Authentication).forRoutes('vehicle');
  }
}
