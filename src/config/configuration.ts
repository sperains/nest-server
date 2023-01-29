import { registerAs } from '@nestjs/config';
import { MergeWithCustomizer, mergeWith } from 'lodash';

export const APPLICATION_CONFIG_KEY = 'APPLICATION_CONFIG';

export default registerAs(APPLICATION_CONFIG_KEY, () => {
  if (process.env.NODE_ENV === 'production') {
    return mergeWith(productionConfig, defaultConfig, customMerge);
  }

  if (process.env.ACTIVE_PROFILE === 'prod') {
    return mergeWith(productionConfig, defaultConfig, customMerge);
  }
  return mergeWith(developmentConfig, defaultConfig, customMerge);
});

// 若当前环境变量未设置则使用默认配置
const customMerge: MergeWithCustomizer = (value, srcValue) => {
  return value ?? srcValue;
};

const defaultConfig: ApplicationConfig = {
  database: {
    url: 'postgresql://sperains:@localhost:5432/nest-server?schema=public',
  },
  redis: {
    host: 'localhost',
    port: 6379,
  },
  server: {
    port: 3010,
    timeout: 10 * 1000,
  },
  upload: {
    path: 'upload',
  },
  static: {
    rootPath: 'static',
    serveRoot: '/static',
  },
};

const developmentConfig: Partial<ApplicationConfig> = {
  server: {
    port: 3012,
  },
};

const productionConfig: Partial<ApplicationConfig> = {
  server: {
    port: 8080,
  },
};

export type ServerConfig = {
  port: number | string;
  timeout: number;
};

export type ApplicationConfig = {
  database: { url: string };
  redis: { host: string; port: number | string };
  server: Partial<ServerConfig>;
  upload: {
    path: string;
  };
  static: {
    rootPath: string;
    serveRoot: string;
  };
};
