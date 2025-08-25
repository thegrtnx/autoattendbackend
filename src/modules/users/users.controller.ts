import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from 'src/dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
