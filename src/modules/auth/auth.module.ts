import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HelpHelper } from 'src/utils/helpers/help.helper';
import { AuthHelper } from 'src/utils';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthHelper],
  exports: [AuthService],
})
export class AuthModule {}
