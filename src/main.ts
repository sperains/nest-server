import FastifyMultipart from '@fastify/multipart';
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import {
  ApplicationConfig,
  APPLICATION_CONFIG_KEY,
} from './config/configuration';
import { swaggerSetup } from './config/swagger.config';
import { PrismaService } from './core/services/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
    }),
  );

  app.enableVersioning({
    defaultVersion: VERSION_NEUTRAL,
    type: VersioningType.URI,
  });

  // 跨域设置
  app.enableCors({
    origin: '*',
    methods: '*',
    credentials: true,
  });

  // 设置swagger
  swaggerSetup(app);

  const logger = app.get<WinstonLogger>(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(logger);

  // 设置文件上传
  app.register(FastifyMultipart, {
    addToBody: true,
  });

  const prismaService = app.get(PrismaService);

  await prismaService.enableShutdownHooks(app);

  const configService = app.get(ConfigService);

  const config = configService.get<ApplicationConfig>(APPLICATION_CONFIG_KEY);

  const port = config?.server.port || 3010;

  await app.listen(port, '0.0.0.0');

  logger.log(`server listen at http://localhost:${port}`);
}
bootstrap();
