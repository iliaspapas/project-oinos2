import { IsNumber } from 'class-validator';

export class ItemPostDto {
  @IsNumber()
  wine: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  password: string;
}
