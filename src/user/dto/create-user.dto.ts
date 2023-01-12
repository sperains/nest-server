import { ApiProperty } from '@nestjs/swagger';
import { SexEnum } from './sex.enum';

export class CreateUserDto {
  @ApiProperty({
    description: '用户名',
    default: 'sperains',
    example: 'sperains',
  })
  username: string;

  @ApiProperty({
    description: '头像',
    default: '',
    required: false,
    example: 'avatar',
  })
  avatar?: string;

  @ApiProperty({
    description: '爱好',
    type: [String],
    example: ['basketball', 'lauf'],
  })
  hobby: string[];

  // @ApiProperty({ type: () => CreateUserDto })
  // friends?: CreateUserDto;

  @ApiProperty({
    enum: SexEnum,
    enumName: 'SexEnum',
    example: SexEnum.Female,
  })
  sex: SexEnum;
}
