import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export type TrackingDocument = Tracking & Document;

@Schema()
export class Tracking {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @Prop()
  vehicle_id: string;

  @Prop()
  // eslint-disable-next-line @typescript-eslint/ban-types
  vehicle_info: {};

  @Prop()
  // eslint-disable-next-line @typescript-eslint/ban-types
  location: {};
}

export const TrackingSchema = SchemaFactory.createForClass(Tracking);
