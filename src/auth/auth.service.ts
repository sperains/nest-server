import { UserService } from '@/api/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { AuthPayload } from '.';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOne(username);

    const { credential } = await this.userService.findUserIdentity(user.id);

    if (compareSync(pass, credential)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload: AuthPayload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
