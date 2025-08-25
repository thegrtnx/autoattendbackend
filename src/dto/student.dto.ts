import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsEnum,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Gender, Status, ParentRole } from '@prisma/client';

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
  picture?: string;
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @ApiProperty({
    description: 'Student status',
    example: 'ACTIVE',
  })
  @IsOptional()
  @IsEnum(Status)
  status: Status;
}

/** Student Address */
export class CreateStudentAddressDto {
  @ApiProperty({
    description: 'Student address',
    example: '123 Main St',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Student longitude',
    example: 123.456,
  })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({
    description: 'Student latitude',
    example: 123.456,
  })
  @IsOptional()
  @IsNumber()
  latitude?: number;
}

export class UpdateStudentAddressDto extends PartialType(
  CreateStudentAddressDto,
) {}

/** Student Parent */
export class CreateStudentParentDto {
  @ApiProperty({
    description: 'Student parent name',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  parentname: string;

  @ApiProperty({
    description: 'Student parent phone SMS',
    example: '081234567890',
  })
  @IsNotEmpty()
  @IsString()
  parentphoneSMS: string;

  @ApiProperty({
    description: 'Student parent phone WA',
    example: '081234567890',
  })
  @IsNotEmpty()
  @IsString()
  parentphoneWA: string;

  @ApiProperty({
    description: 'Student parent email',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsString()
  parentemail: string;

  @ApiProperty({
    description: 'Student parent address',
    example: '123 Main St',
  })
  @IsOptional()
  @IsString()
  parentaddress?: string;

  @ApiProperty({
    description: 'Student parent role',
    example: 'FATHER',
  })
  @IsNotEmpty()
  @IsEnum(ParentRole)
  parentrole: ParentRole;
}

export class UpdateStudentParentDto extends PartialType(
  CreateStudentParentDto,
) {}
