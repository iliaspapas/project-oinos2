import { IsBoolean, IsNumber, IsString, IsOptional } from 'class-validator';

export class OrderPutDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsNumber()
  orderItems: number;
}
