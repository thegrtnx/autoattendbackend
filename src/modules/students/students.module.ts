import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentHelper } from 'src/utils';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, StudentHelper],
})
export class StudentsModule {}
