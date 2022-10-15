import { Global, Module } from '@nestjs/common';
import { ScheduleController, ScheduleService } from '.';

@Global()
@Module({
  providers: [ScheduleService],
  controllers: [ScheduleController],
  imports: [ScheduleService],
})
export class ScheduleModule {}
