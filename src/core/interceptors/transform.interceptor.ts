import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { API_MESSAGE_META_KEY } from '../decorators/api-message.decorator';
import { ApiCode } from '../enums/api-code.enum';

export interface ApiResult<T> {
  data: T;
  code: ApiCode;
  message: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResult<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResult<T>> | Promise<Observable<ApiResult<T>>> {
    const message = this.reflector.get<string>(
      API_MESSAGE_META_KEY,
      context.getHandler(),
    );

    return next.handle().pipe(
      map((data) => {
        return {
          code: ApiCode.Success,
          message: message ?? 'OK',
          data,
        };
      }),
    );
  }
}
