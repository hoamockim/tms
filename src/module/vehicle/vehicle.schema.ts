import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Schema as MongoSchema } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  code: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
