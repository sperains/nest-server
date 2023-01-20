import { NestFastifyApplication } from '@nestjs/platform-fastify';
import compression from '@fastify/compress';
import FastifyMultipart from '@fastify/multipart';
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { swaggerSetup } from '@/config/swagger.config';
import { PrismaService } from '@/core/services/prisma.service';

const registerPlugins = async (app: NestFastifyApplication) => {
  // 设置压缩
  app.register(compression, { encodings: ['gzip', 'deflate'] });

  // 设置文件上传
  app.register(FastifyMultipart, {
    addToBody: true,
  });

  // 开启版本控制
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

  const prismaService = app.get(PrismaService);

  await prismaService.enableShutdownHooks(app);
};

export default registerPlugins;
