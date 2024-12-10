import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '@config/env';
import initModels from '@models/index';
import { Sequelize } from 'sequelize';

export let seq: Sequelize;

export async function setupSequelize() {
  if (!seq) {
    seq = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      port: Number(DB_PORT),
      define: {
        timestamps: true,
        underscored: true,
        // paranoid: true,
      },
      dialect: 'mysql',
      pool: {
        max: 15,
        min: 5,
        acquire: 10000,
        idle: 100,
      },
      logging: process.env.NODE_ENV === 'prod' ? false : () => {},
      // logging: false,
      dialectOptions: {
        multipleStatements: true,
        // DECIMAL 을 숫자로 변경해줌
        decimalNumbers: true,
      },
      query: {
        // raw: true, 이거 쓰면 join 못씀
        nest: true,
      },
    });
  }

  initModels(seq);
}

export async function setupLocalSequelize() {
  if (!seq) {
    seq = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      port: Number(DB_PORT),
      define: {
        timestamps: true,
        underscored: true,
        // paranoid: true,
      },
      dialect: 'mysql',
      pool: {
        max: 10,
        min: 5,
        acquire: 30000,
        idle: 1000,
      },
      // logging: process.env.NODE_ENV === 'prod' ? false : console.log,
      logging: false,
      dialectOptions: {
        multipleStatements: true,
        // DECIMAL 을 숫자로 변경해줌
        decimalNumbers: true,
        connectTimeout: 60000,
      },
      query: {
        // raw: true, 이거 쓰면 join 못씀
        nest: true,
      },

      // read ECONNRESET 에러떠서 추가함
      retry: {
        max: 3, // 추가
      },
    });
  }

  initModels(seq);
}
