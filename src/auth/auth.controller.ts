import { LogedInUser } from '@/core/decorators/loged-in-user.decorator';
import { Public } from '@/core/decorators/public.decorator';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LogedInUserProvider } from '../core/providers/loged-in-user.provider';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly logedInUserProvider: LogedInUserProvider,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async login(@LogedInUser() user: User) {
    return this.authService.login(user);
  }

  @Get('profile')
  getProfile() {
    console.log('logedInUser:', this.logedInUserProvider.user);
    return this.logedInUserProvider.user;
  }
}
