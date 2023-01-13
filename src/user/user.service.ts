import { PrismaService } from '@/core/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly config: ConfigService,
  ) {}

  private readonly users = [
    {
      userId: 1,
      username: 'sperains',
      password: '1300',
    },
    {
      userId: 2,
      username: 'zhangsan',
      password: 'guest',
    },
  ];

  async getAll(): Promise<User[]> {
    const userList = await this.prisma.user.findMany({
      skip: 3,
      take: 10,
      orderBy: {
        id: 'asc',
      },
    });

    return userList;
  }

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
