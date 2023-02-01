import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { User } from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class LogedInUserProvider {
  get user(): User {
    return this.request.user;
  }

  constructor(@Inject(REQUEST) private readonly request: any) {}
}
