import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import StringUtil from '@kiwi/strings';
import { RedisCacheService } from '@shared/modules/redis';
import { ProduceService } from '@shared/modules/kafka/produce.service';
import { ScheduleDto } from './dto';
import { ScheduleRepository, Schedule } from '.';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger('schedule service');
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    @Inject(CACHE_MANAGER) private readonly redisService: RedisCacheService,
    private readonly produce: ProduceService,
  ) {}

  async create(dto: ScheduleDto) {
    const scheduler = this.scheduleRepository.create(dto);
    this.produce.send(process.env.SCHEDULE_EVENT, {
      eventId: StringUtil.generateRandom(22),
      payload: {
        ...scheduler,
      },
    });
    return scheduler;
  }

  async getAll() {
    const schedules = (await this.redisService.get(
      'scheduleByDay',
    )) as Schedule[];
    if (schedules.length == 0) {
      //TODO: get from db
    }
    return schedules;
  }
}
