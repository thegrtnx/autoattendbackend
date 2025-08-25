import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'User email',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User phone',
    example: '081234567890',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'User company name',
    example: 'Company Name',
  })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiProperty({
    description: 'User confirm password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  @ApiProperty({
    description: 'User referral code',
    example: '123456',
  })
  @IsOptional()
  @IsString()
  referralCode?: string;
}

export class SignInDto {
  @ApiProperty({
    description: 'User email',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'User confirm password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty({
    description: 'User phone',
    example: '081234567890',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'User address',
    example: '123 Main St',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'User city',
    example: 'New York',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'User state',
    example: 'NY',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({
    description: 'User country',
    example: 'USA',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    description: 'User zip',
    example: '10001',
  })
  @IsOptional()
  @IsString()
  zip?: string;

  @ApiProperty({
    description: 'User logo',
    example: 'https://example.com/logo.jpg',
  })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({
    description: 'User website',
    example: 'https://example.com',
  })
  @IsNotEmpty()
  @IsString()
  website?: string;

  @ApiProperty({
    description: 'User description',
    example: 'This is a description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'User company name',
    example: 'Company Name',
  })
  @IsOptional()
  @IsString()
  companyName?: string;
}
