import { Public } from '@/core/decorator/public.decorator';
import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Controller('public')
@Public()
export class PublicController {
  constructor(private readonly httpService: HttpService) {}

  @Get('cats')
  async findAllCats(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get('https://echo.apifox.com/get?q1=v1&q2=v2').pipe(
        catchError(() => {
          throw new Error('axios error');
        }),
      ),
    );

    return data;
  }
}
