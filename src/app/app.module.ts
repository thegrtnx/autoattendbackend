import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//app
import { AppController } from './app.controller';
import { AppService } from './app.service';

//config
import { CustomLoggerService } from 'src/lib/logger/logger.service';

//library modules
import { LibModule } from 'src/lib/lib.module';
import { controlModule } from 'src/modules/control.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LibModule,
    controlModule,
  ],
  controllers: [AppController],
  providers: [AppService, CustomLoggerService],
})
export class AppModule {}
