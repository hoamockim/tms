import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RedisCacheService } from '../redis';

@Injectable()
export class TrackingService implements OnApplicationBootstrap {
  private readonly logger = new Logger(TrackingService.name);
  constructor(
    @Inject(CACHE_MANAGER) private readonly redisService: RedisCacheService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async onApplicationBootstrap() {}

  @Cron('0 24 * * *')
  async cronResetForNewDay() {
    await this.redisService.set('', '');
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async cronStatistic() {
    await this.redisService.set('', '');
  }
}
