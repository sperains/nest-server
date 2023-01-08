import { INestApplication, OnModuleInit, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientOptions } from '@prisma/client/runtime';
import { LoggerOptions } from 'winston';

export type PrismaServiceOptions = {
  options?: PrismaClientOptions;
  logger?: LoggerOptions;
};

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  static register(): PrismaService {
    const prisma = new PrismaService({
      log: ['query', 'error', 'info', 'warn'],
    });

    return prisma;
  }
}
