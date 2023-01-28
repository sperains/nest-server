import { UserService } from '@/api/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOne(username);

    console.log('user', user);

    const { credential } = await this.userService.findUserIdentity(user.id);

    if (credential === pass) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    console.log(user.username);
    console.log(user.id);
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
