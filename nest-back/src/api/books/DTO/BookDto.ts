import { IsNumber, IsString, Length, IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBookDTO {
  @IsNumber()
  libraryId: number;

  @IsString()
  @Length(3, 255)
  title: string;

  @IsString()
  @Length(3, 255)
  author: string;

  @IsNumber()
  year: number;

  @IsString()
  description: string;

  @IsString()
  coverImage: string;

  @IsBoolean()
  isAvailable: boolean;
}

export class UpdateBookDTO {
  @IsOptional()
  @IsNumber()
  libraryId?: number;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  author?: string;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}