import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { HelpHelper } from 'src/utils';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, HelpHelper],
})
export class StudentsModule {}
