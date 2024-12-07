import dotenv from 'dotenv';
import path from 'path';

const environment = process.env.NODE_ENV || 'development';
const envPath = path.resolve(process.cwd(), `.env.${environment}`);

dotenv.config({ path: envPath });

export const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3001,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  // ... other env variables
};
