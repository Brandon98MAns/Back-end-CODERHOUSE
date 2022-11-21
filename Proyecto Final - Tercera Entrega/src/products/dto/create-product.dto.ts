import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsInt()
  price: number;

  @IsInt()
  stock: number;
}
