import { User } from './modules/api/auth/models/user.schema';
import { config as dotenv } from 'dotenv';

dotenv();

export default {
  entities: [User], // no need for `entitiesTs` this way
  dbName: process.env.MARIADB_DATABASE,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  type: 'mysql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
};
