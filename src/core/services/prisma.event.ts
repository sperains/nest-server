import { Prisma, PrismaClient } from '@prisma/client';
import { Logger } from 'winston';

export function addPrismaEventListener(prisma: PrismaClient, logger: Logger) {
  prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
    logger.info(`Query: ${event.query} `);
    logger.info(`Params: ${event.params}`);
  });
  prisma.$use(async (params: Prisma.MiddlewareParams, next) => {
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
