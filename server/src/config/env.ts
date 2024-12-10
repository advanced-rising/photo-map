import dotenv from 'dotenv';
import path from 'path';

const environment = process.env.NODE_ENV || 'development';
const envPath = path.resolve(process.cwd(), `.env.${environment}`);

dotenv.config({ path: envPath });

export const APP_ENV = (process.env.NODE_ENV as 'prod' | 'dev' | 'local' | 'test') || 'local';

export const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3001,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT || 3306,
};

export const DB_NAME = process.env.DB_NAME || 'test';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
