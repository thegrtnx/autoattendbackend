import { HttpStatus, Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import {
  CreateStudentAddressDto,
  CreateStudentDto,
  CreateStudentParentDto,
  UpdateStudentAddressDto,
  UpdateStudentDto,
  UpdateStudentParentDto,
} from 'src/dto';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { handleResponse, HelpHelper } from 'src/utils';
import { QrService } from 'src/lib/qrcodeGen/qr.service';
import { CloudinaryService } from 'src/lib/cloudinary/cloudinary.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpHelper: HelpHelper,
    private readonly qrService: QrService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  //create student
  async createStudent(createStudentDto: CreateStudentDto) {
    //generate random unique qrid
    const qrId = uuidv4();
    const qrpath = `https://${process.env.PLATFORM_URL}/attend/${qrId}`;

    //create the qr code
    const qrCode = await this.qrService.createAndUploadQr(qrpath);

    const student = await this.prisma.students.create({
      data: {
        ...createStudentDto,
        qrId,
        qrUrl: qrCode.url,
        qrPublicId: qrCode.publicId,
      },
    });

    return new handleResponse(
      HttpStatus.CREATED,
      'Student created successfully',
      student,
    ).getResponse();
  }

  //create bulk students
  async createBulkStudents(createStudentDto: CreateStudentDto[]) {
    const result = await this.prisma.students.createMany({
      data: createStudentDto,
      skipDuplicates: true,
    });

    return new handleResponse(
      HttpStatus.CREATED,
      'Students created successfully',
      result,
    ).getResponse();
  }

  //get all students
  async getStudents(status: Status, page: number, limit: number) {
    const students = await this.prisma.students.findMany({
      where: { status },
      include: {
        StudentAddress: true,
        StudentParent: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return new handleResponse(
      HttpStatus.OK,
      'Students fetched successfully',
      students,
    ).getResponse();
  }

  //get student by id
  async getStudentById(id: string) {
    const student = await this.helpHelper.checkIfStudentExists(id);

    return new handleResponse(
      HttpStatus.OK,
      'Student fetched successfully',
      student,
    ).getResponse();
  }

  //update student by id
  async updateStudentById(id: string, updateStudentDto: UpdateStudentDto) {
    await this.helpHelper.checkIfStudentExists(id);

    const updatedStudent = await this.prisma.students.update({
      where: { studentid: id },
      data: updateStudentDto,
    });

    return new handleResponse(
      HttpStatus.OK,
      'Student updated successfully',
      updatedStudent,
    ).getResponse();
  }

  //delete student by id
  async deleteStudentById(id: string) {
    const student = await this.helpHelper.checkIfStudentExists(id);

    //delete the qr code from cloudinary
    if (student.qrPublicId) {
      await this.cloudinaryService.deleteMedia(student.qrPublicId);
    }

    const deletedStudent = await this.prisma.students.delete({
      where: { studentid: id },
    });

    return new handleResponse(
      HttpStatus.OK,
      'Student deleted successfully',
      deletedStudent,
    ).getResponse();
  }

  //delete bulk students
  async deleteBulkStudents(ids: string[]) {
    const students = await this.prisma.students.findMany({
      where: { studentid: { in: ids } },
    });

    //delete the qr code from cloudinary
    for (const student of students) {
      if (student.qrPublicId) {
        await this.cloudinaryService.deleteMedia(student.qrPublicId);
      }
    }

    const deletedStudents = await this.prisma.students.deleteMany({
      where: { studentid: { in: ids } },
    });

    if (deletedStudents.count === 0) {
      throw new handleResponse(HttpStatus.NOT_FOUND, 'Students not found');
    }

    return new handleResponse(
      HttpStatus.OK,
      'Students deleted successfully',
      deletedStudents,
    ).getResponse();
  }

  //delete all students
  async deleteAllStudents() {
    //delete the qr code from cloudinary
    const students = await this.prisma.students.findMany();
    for (const student of students) {
      if (student.qrPublicId) {
        await this.cloudinaryService.deleteMedia(student.qrPublicId);
      }
    }

    const deletedStudents = await this.prisma.students.deleteMany();

    return new handleResponse(
      HttpStatus.OK,
      'All students deleted successfully',
      deletedStudents,
    ).getResponse();
  }

  //** Student Address */

  //create student address
  async createStudentAddress(
    id: string,
    createStudentAddressDto: CreateStudentAddressDto,
  ) {
    await this.helpHelper.checkIfStudentExists(id);

    const studentAddress = await this.prisma.studentAddress.create({
      data: {
        ...createStudentAddressDto,
        studentid: id,
      },
    });

    return new handleResponse(
      HttpStatus.CREATED,
      'Student address created successfully',
      studentAddress,
    ).getResponse();
  }

  //update student address by id
  async updateStudentAddressById(
    id: string,
    updateStudentAddressDto: UpdateStudentAddressDto,
  ) {
    await this.helpHelper.checkIfStudentExists(id);

    const studentAddress = await this.prisma.studentAddress.update({
      where: { addressid: id },
      data: updateStudentAddressDto,
    });

    return new handleResponse(
      HttpStatus.OK,
      'Student address updated successfully',
      studentAddress,
    ).getResponse();
  }

  //delete student address by id
  async deleteStudentAddressById(id: string) {
    await this.helpHelper.checkIfStudentExists(id);

    const studentAddress = await this.prisma.studentAddress.delete({
      where: { addressid: id },
    });

    return new handleResponse(
      HttpStatus.OK,
      'Student address deleted successfully',
      studentAddress,
    ).getResponse();
  }

  //** Student Parent */

  //create student parent
  async createStudentParent(
    id: string,
    createStudentParentDto: CreateStudentParentDto,
  ) {
    await this.helpHelper.checkIfStudentExists(id);

    const studentParent = await this.prisma.studentParent.create({
      data: {
        ...createStudentParentDto,
        studentid: id,
      },
    });

    return new handleResponse(
      HttpStatus.CREATED,
      'Student parent created successfully',
      studentParent,
    ).getResponse();
  }

  //create bulk student parent
  async createBulkStudentParent(
    id: string,
    createStudentParentDto: CreateStudentParentDto[],
  ) {
    await this.helpHelper.checkIfStudentExists(id);

    const studentParent = await this.prisma.studentParent.createMany({
      data: createStudentParentDto.map((dto) => ({
        ...dto,
        studentid: id,
      })),
    });

    return new handleResponse(
      HttpStatus.CREATED,
      'Student parent created successfully',
      studentParent,
    ).getResponse();
  }

  //update student parent by id
  async updateStudentParentById(
    id: string,
    updateStudentParentDto: UpdateStudentParentDto,
  ) {
    await this.helpHelper.checkIfStudentExists(id);

    const studentParent = await this.prisma.studentParent.update({
      where: { parentid: id },
      data: updateStudentParentDto,
    });

    return new handleResponse(
      HttpStatus.OK,
      'Student parent updated successfully',
      studentParent,
    ).getResponse();
  }

  //delete student parent by id
  async deleteStudentParentById(id: string) {
    await this.helpHelper.checkIfStudentExists(id);

    const studentParent = await this.prisma.studentParent.delete({
      where: { parentid: id },
    });

    return new handleResponse(
      HttpStatus.OK,
      'Student parent deleted successfully',
      studentParent,
    ).getResponse();
  }
}
