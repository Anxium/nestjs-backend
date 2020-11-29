import { config as dotEnvConfig } from 'dotenv';
dotEnvConfig();

export default {
  apiConfig: {
    port: process.env.API_PORT,
  },
  jwtConfig: {
    expiresIn: 3600,
    secret: process.env.JWT_SECRET,
  },
  ormConfig: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
