import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateInversionDto {
  @IsNumber()
  @Min(0)
  monto: number;

  @IsString()
  @IsNotEmpty()
  tipo: string;
}
