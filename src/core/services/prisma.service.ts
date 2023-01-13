import configuration from '@/config/configuration';
import {
  INestApplication,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { addPrismaEventListener } from './prisma.event';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) logger: Logger,
    @Inject(configuration.KEY)
    config: ConfigType<typeof configuration>,
  ) {
    const logLevel: (Prisma.LogLevel | Prisma.LogDefinition)[] =
      process.env.NODE_ENV !== 'production'
        ? [{ level: 'query', emit: 'event' }, 'error', 'warn', 'info']
        : [{ level: 'query', emit: 'event' }, 'error', 'warn'];

    if (!config.database?.url) {
      throw new Error('数据库连接未设置');
    }

    super({
      log: logLevel,
      datasources: {
        db: {
          url: config.database.url,
        },
      },
    });

    addPrismaEventListener(this, logger);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
