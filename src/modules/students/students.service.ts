import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from 'src/dto';
import { PrismaService } from 'src/lib/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    return this.prisma.students.create({
      data: createStudentDto,
    });
  }
}
