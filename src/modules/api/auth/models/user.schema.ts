import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class User {
  @PrimaryKey()
  uuid: string = v4();

  @Property()
  @Unique()
  username!: string;

  @Property()
  display_name!: string;

  @Property()
  password_hash!: string;

  @Property()
  @Unique()
  email!: string;

  constructor(
    username: string,
    display_name: string,
    password_hash: string,
    email: string,
  ) {
    this.username = username;
    this.display_name = display_name;
    this.email = email;
    this.password_hash = password_hash;
  }
}
