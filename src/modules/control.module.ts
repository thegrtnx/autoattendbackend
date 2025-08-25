import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { AttendanceModule } from './attendance/attendance.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [StudentsModule, AttendanceModule, UsersModule],
})
export class controlModule {}
