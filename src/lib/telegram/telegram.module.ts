import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramService } from './telegram.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramBotModule {}
