import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { ScheduleDto } from './dto';
import { Schedule } from './schedule.schema';

export class ScheduleRepository {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<Schedule>,
  ) {}

  async create(dto: ScheduleDto) {
    const schedule = new this.scheduleModel(dto);
    return schedule.save();
  }

  async getById(id: Schema.Types.ObjectId) {
    let schedule;
    try {
      schedule = await this.scheduleModel.findById({ _id: id });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
    return schedule;
  }

  async findAll() {
    return this.scheduleModel.find().exec();
  }
}
