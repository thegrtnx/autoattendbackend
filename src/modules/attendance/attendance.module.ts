import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { HelpHelper } from 'src/utils/helpers/help.helper';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService, HelpHelper],
})
export class AttendanceModule {}
