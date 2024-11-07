import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@test.com',
    description: '사용자 이메일',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: '비밀번호 (8자 이상)',
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: '홍길동',
    description: '사용자 이름',
  })
  @IsString()
  name: string;
}
