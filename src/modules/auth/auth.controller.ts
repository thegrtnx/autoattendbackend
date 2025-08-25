import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from 'src/dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //signup user
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User signed up successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: SignupDto })
  @Post('create-user')
  createUser(@Body() signupDto: SignupDto) {
    return this.authService.createUser(signupDto);
  }
}
