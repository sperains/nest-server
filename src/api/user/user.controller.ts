import { ApiResultResponse } from '@/core/decorators/api-result-response.decorator';
import { Public } from '@/core/decorators/public.decorator';
import { PrismaService } from '@/core/services/prisma.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IdentityType } from '@prisma/client';
import { compare, getRounds } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { ApiResult } from 'src/core/entity/api-result.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { SexEnum } from './dto/sex.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  @Version('2')
  @Get()
  @ApiResultResponse(CreateUserDto)
  getAll(@Body() createUserDto: CreateUserDto) {
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

  @Post('/post')
  @ApiCreatedResponse({
    description: '成功时返回',
    type: CreateUserDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
  }

  @Get('/queryByEnum')
  @ApiTags('test')
  @ApiQuery({ name: 'sex', enum: SexEnum })
  queryByEnum(@Query('sex') sex: SexEnum) {
    return sex;
  }

  @Public()
  @Get('check')
  async checkPassword(@Query('username') username: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        username: username,
      },
    });

    const userIdentity = await this.prisma.userIdentity.findUniqueOrThrow({
      where: {
        user_identity_type: {
          user_id: user.id,
          identity_type: IdentityType.Account,
        },
      },
    });

    return {
      round: getRounds(userIdentity.credential),
      verified: compare('1300', userIdentity.credential),
    };
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
