import { IsNumber, IsOptional } from 'class-validator';

export class ItemPuTDto {
  @IsOptional()
  @IsNumber()
  wine: string;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  password: string;
}
