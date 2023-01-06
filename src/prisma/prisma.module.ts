import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  // 通过exports可以导出在providers中申明的Provider，之后在任意导入了此模块的地方都可以使用，不需要再重复申明
  exports: [PrismaService],
})
export class PrismaModule {}
