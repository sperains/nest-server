import {
  INestApplication,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) logger: Logger) {
    super({
      log: [
        {
          level: 'query',
          emit: 'event',
        },
      ],
    });

    this.$on<any>('query', (event: Prisma.QueryEvent) => {
      logger.info(
        `Query: ${event.query} Params: ${event.params} Duration: ${event.duration}ms`,
      );
    });
    this.$use(async (params: Prisma.MiddlewareParams, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      logger.info(
        `Query ${params.model}.${params.action} took ${after - before}ms`,
      );
      logger.info(`Result ${JSON.stringify(result)}`);
      return result;
    });
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
