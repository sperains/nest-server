import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app/app.module';
import {
  ApplicationConfig,
  APPLICATION_CONFIG_KEY,
} from './config/configuration';
import registerPlugins from './plugins';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
    }),
  );

  await registerPlugins(app);

  const logger = app.get<WinstonLogger>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  const configService = app.get(ConfigService);

  const config = configService.get<ApplicationConfig>(APPLICATION_CONFIG_KEY);

  const port = config?.server.port || 3010;

  await app.listen(port, '0.0.0.0');

  logger.log(`server listen at http://localhost:${port}`);
}
bootstrap();
