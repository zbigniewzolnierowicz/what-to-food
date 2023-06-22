import { Migration } from '@mikro-orm/migrations';

export class Migration20230622153404 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`uuid` varchar(255) not null, `username` varchar(255) not null, `display_name` varchar(255) not null, `password_hash` varchar(255) not null, `email` varchar(255) not null, primary key (`uuid`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user` add unique `user_username_unique`(`username`);');
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');
  }

}
