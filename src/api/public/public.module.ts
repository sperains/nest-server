import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PublicController],
  imports: [HttpModule],
})
export class PublicModule {}
