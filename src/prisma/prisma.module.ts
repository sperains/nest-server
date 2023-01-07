import { Global, Logger, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

const prisma = new PrismaService();

prisma.$use(async (params, next) => {
  const before = Date.now();

  const result = await next(params);

  const after = Date.now();

  console.log(`${JSON.stringify(params.args)}`);

  console.log(
    `Query ${params.model}.${params.action} took ${after - before}ms`,
  );

  return result;
});

@Global()
@Module({
  providers: [{ provide: PrismaService, useValue: prisma }],
  // 通过exports可以导出在providers中申明的Provider，之后在任意导入了此模块的地方都可以使用，不需要再重复申明
  exports: [PrismaService],
})
export class PrismaModule {}
