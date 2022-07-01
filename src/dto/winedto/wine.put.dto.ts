import { IsBoolean, IsNumber, IsString, IsOptional } from 'class-validator';

export class WinePutDto {
  @IsOptional()
  @IsString()
  kind: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  date: string;

  @IsOptional()
  @IsNumber()
  price: number;
}
