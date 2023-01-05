import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { EventsGateway } from './gateway/events.gateway';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CoreModule, PrismaModule, UserModule],
  controllers: [AppController],

  providers: [AppService, EventsGateway],
})
export class AppModule {}
