import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class OrderPostDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsBoolean()
  status: boolean;

  @IsNumber()
  orderItems: number;
}
