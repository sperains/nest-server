import { ApiProperty } from '@nestjs/swagger';

export class ApiResult<T = unknown> {
  @ApiProperty()
  code: number;

  @ApiProperty()
  data: T;

  @ApiProperty()
  msg?: string;

  constructor(partial?: Partial<ApiResult<T>>) {
    Object.assign(this, partial);
  }

  static Ok<T>(): ApiResult<T>;

  static Ok<T>(data: T): ApiResult<T>;

  static Ok<T>(data: T, msg: string): ApiResult<T>;

  static Ok<T>(data?: T, msg?: string): ApiResult<T> {
    const r = new ApiResult<T>();

    r.code = 200;

    if (data) {
      r.data = data;
    }

    if (msg) {
      r.msg = msg;
    }

    return r;
  }
}
