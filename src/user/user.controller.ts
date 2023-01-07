import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Exclude } from 'class-transformer';
import { ApiResult } from 'src/core/entity/api-result.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Version('2')
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Version('1')
  @Get()
  getFromV1() {
    return 'return from v1';
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getFromDefault() {
    const user = new UserEntity({
      firstName: 'sperains',
      lastName: 'zhangsan',
      fullName: 'wangwu',
    });

    return ApiResult.Ok(user);
  }
}

class UserEntity {
  firstName: string;

  lastName: string;

  @Exclude()
  fullName: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
