import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { StudentHelper } from 'src/utils/helpers/student.helper';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService, StudentHelper],
})
export class AttendanceModule {}
