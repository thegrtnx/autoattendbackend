import { Controller, Get, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @ApiOperation({ summary: 'Clock in a student' })
  @ApiParam({ name: 'qrId', type: String, description: 'QR ID' })
  @Get('clockin/:qrId')
  clockin(@Param('qrId') qrId: string) {
    return this.attendanceService.clockin(qrId);
  }
}
