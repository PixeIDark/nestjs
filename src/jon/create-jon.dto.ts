import { IsNumber, IsString } from 'class-validator';

export class CreateJonDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  breed: string;
}
