import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import configuration, { ApplicationConfig } from './config/configuration';
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

  swaggerSetup(app);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const prismaService = app.get(PrismaService);

  await prismaService.enableShutdownHooks(app);

  const configService = app.get(ConfigService);

  const config = configService.get<ApplicationConfig>(configuration.KEY);

  const port = config?.server.port || 3010;

  console.log(process.env.JWT_SECRET);

  await app.listen(port, '0.0.0.0');
}
bootstrap();
