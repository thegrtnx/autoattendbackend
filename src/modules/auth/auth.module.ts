import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HelpHelper } from 'src/utils/helpers/help.helper';

@Module({
  controllers: [AuthController],
  providers: [AuthService, HelpHelper],
})
export class AuthModule {}
