import { ConfigService } from '@nestjs/config';
import { ServeStaticModuleAsyncOptions } from '@nestjs/serve-static';
import { join } from 'path';
import { ApplicationConfig, APPLICATION_CONFIG_KEY } from './configuration';

const staticConfig: ServeStaticModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory(configService: ConfigService) {
    const config = configService.get<ApplicationConfig>(APPLICATION_CONFIG_KEY);
    return [
      {
        rootPath: join(process.cwd(), config?.static.rootPath || 'static'),
        serveRoot: config?.static.serveRoot || '/static',
      },
    ];
  },
};

export default staticConfig;
