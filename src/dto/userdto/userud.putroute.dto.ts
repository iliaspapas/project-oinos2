import { IsString, IsOptional } from 'class-validator';

export class UserPutDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  role: string;
}
