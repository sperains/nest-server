import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany({
      skip: 3,
      take: 10,
      orderBy: {
        id: 'asc',
      },
    });
  }
}
