import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password_hash: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
