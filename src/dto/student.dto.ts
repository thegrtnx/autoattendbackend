import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Gender } from '@prisma/client';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Student first name',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty({
    description: 'Student last name',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'Student class',
    example: '1A',
  })
  @IsNotEmpty()
  @IsString()
  class: string;

  @ApiProperty({
    description: 'Student date of birth',
    example: '2025-01-01',
  })
  @IsNotEmpty()
  @IsString()
  dob: string;

  @ApiProperty({
    description: 'Student gender',
    example: 'MALE',
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'Student picture',
    example: 'https://example.com/picture.jpg',
  })
  @IsOptional()
  @IsString()
  picture: string;
}
