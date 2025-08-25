import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HelpHelper } from 'src/utils/helpers/help.helper';

@Module({
  controllers: [UsersController],
  providers: [UsersService, HelpHelper],
})
export class UsersModule {}
