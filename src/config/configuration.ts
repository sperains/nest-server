import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  console.log(process.env.ACTIVE_PROFILE);
  if (process.env.ACTIVE_PROFILE == 'dev') {
    return developmentConfig;
  }

  if (process.env.ACTIVE_PROFILE == 'prod') {
    return productionConfig;
  }

  return process.env.NODE_ENV !== 'production'
    ? developmentConfig
    : productionConfig;
});

const developmentConfig: Partial<ApplicationConfig> = {
  database: {
    url: 'postgresql://sperains:@localhost:5432/nest-server?schema=public',
  },
  redis: {
    host: '',
    port: '',
  },
  server: {
    port: 3010,
  },
};

const productionConfig: Partial<ApplicationConfig> = {
  database: {
    url: 'postgresql://sperains:@localhost:5432/nest-server?schema=public',
  },
  redis: {
    host: '',
    port: '',
  },
  server: {
    port: 8080,
  },
};

export type ApplicationConfig = {
  database: { url: string };
  redis: { host: string; port: number | string };
  server: {
    port: number | string;
  };
};
