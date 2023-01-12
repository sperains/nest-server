import { ApiResult } from '@/core/entity/api-result.entity';
import { ApiPaginated } from '@/core/entity/api-paginated.entity';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const createDocument = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('nest-server')
    .setDescription('nest-server的接口文档')
    .setVersion('1.0')
    .build();

  // document是一个与OpenApi一致的序列化的对象。可以将该文件保存为JSON或者YAML文件，然后通过其他方式使用它
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ApiPaginated, ApiResult],
  });

  return document;
};

export function swaggerSetup(app: INestApplication) {
  SwaggerModule.setup('api', app, createDocument(app), {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
