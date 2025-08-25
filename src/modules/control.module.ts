import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { AttendanceModule } from './attendance/attendance.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [StudentsModule, AttendanceModule, UsersModule, AuthModule],
})
export class controlModule {}
