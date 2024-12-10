import { Sequelize } from 'sequelize-typescript';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, ENV } from './env';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: DB_HOST,
  port: Number(ENV.DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: false,
  models: [__dirname + '/../models'],
  dialectOptions: {
    allowPublicKeyRetrieval: true,
    useSSL: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// 데이터베이스 연결 테스트 함수
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export default sequelize;
