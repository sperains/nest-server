import {
  ApplicationConfig,
  APPLICATION_CONFIG_KEY,
} from '@/config/configuration';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

// 定义超时时间
const REQUEST_TIMEOUT = 10 * 1000;

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const config = this.configService.get<ApplicationConfig>(
      APPLICATION_CONFIG_KEY,
    );

    return next.handle().pipe(
      timeout(config?.server.timeout ?? REQUEST_TIMEOUT),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }

        return throwError(() => err);
      }),
    );
  }
}
