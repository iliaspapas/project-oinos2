import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class WinePostDto {
  @IsString()
  kind: string;

  @IsString()
  lastname: string;

  @IsString()
  date: string;

  @IsNumber()
  price: number;
}
