import { PrismaService } from '@/core/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IdentityType, User } from '@prisma/client';

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

  async findOne(username: string) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        username: username,
      },
    });

    return user;
  }

  async findUserIdentity(
    userId: number,
    identity_type: IdentityType = 'Account',
  ) {
    return await this.prisma.userIdentity.findFirstOrThrow({
      where: {
        user_id: userId,
        identity_type,
      },
    });
  }
}
