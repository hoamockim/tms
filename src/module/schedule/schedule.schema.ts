import { Vehicle } from '@module/vehicle/vehicle.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Schema as MongoSchema } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

@Schema()
export class Schedule {
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId;

  @Prop({ required: true, ref: Vehicle.name })
  vehicle_id: MongoSchema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  starttime: number;

  @Prop({ required: true })
  endtime: number;

  @Prop()
  createdBy: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
