import { ConnectionOptions } from 'typeorm';
import { UploadImage } from '../image/entity/image.entity';
import 'dotenv/config';

interface DBConnectionOptions {
  [env: string]: ConnectionOptions;
}

const connectionOptions: DBConnectionOptions = {
  image: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    entities: [UploadImage],
  },
};

export { connectionOptions };
