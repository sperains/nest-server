import { ApiProperty } from '@nestjs/swagger';

export class ApiPaginated<T> {
  @ApiProperty({
    description: '数据总条数',
  })
  total: number;

  list: T[];
}
