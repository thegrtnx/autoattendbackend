import { Injectable, Global, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { handleResponse } from '..';

@Global()
@Injectable()
export class StudentHelper {
  constructor(private readonly prisma: PrismaService) {}

  //helper function to check if student exists
  async checkIfStudentExists(id: string) {
    const student = await this.prisma.students.findUnique({
      where: { studentid: id },
    });

    if (!student) {
      throw new handleResponse(HttpStatus.NOT_FOUND, 'Student not found');
    }

    return student;
  }
}
