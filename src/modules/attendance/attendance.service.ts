import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { StudentHelper } from 'src/utils/helpers/student.helper';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly studentHelper: StudentHelper,
  ) {}

  async clockin(qrId: string) {
    const student = await this.studentHelper.checkIfQrIdIsValid(qrId);
  }
}
