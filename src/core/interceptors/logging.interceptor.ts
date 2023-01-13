import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable, tap } from 'rxjs';
import { Logger } from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.info('Before');

    const now = Date.now();

    return next
      .handle()
      .pipe(tap(() => this.logger.info(`After... ${Date.now() - now}ms`)));
  }
}
