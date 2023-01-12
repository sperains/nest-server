import { PrismaService } from '@/core/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
}
