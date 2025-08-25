import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import {
  CreateStudentAddressDto,
  CreateStudentDto,
  CreateStudentParentDto,
  UpdateStudentAddressDto,
  UpdateStudentDto,
  UpdateStudentParentDto,
} from 'src/dto';
import { Status } from '@prisma/client';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  //create student
  @ApiOperation({ summary: 'Create a new student' })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({ status: 201, description: 'Student created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @HttpCode(201)
  @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.createStudent(createStudentDto);
  }

  //create bulk student
  @ApiOperation({ summary: 'Create bulk students' })
  @ApiBody({ type: [CreateStudentDto] })
  @ApiResponse({ status: 201, description: 'Students created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @HttpCode(201)
  @Post('bulk')
  createBulkStudents(@Body() createStudentDto: CreateStudentDto[]) {
    return this.studentsService.createBulkStudents(createStudentDto);
  }

  //get all students
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, description: 'Students fetched successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiQuery({ name: 'status', type: String, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @HttpCode(200)
  @Get()
  getStudents(
    @Query('status') status: Status = Status.ACTIVE,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.studentsService.getStudents(status, page, limit);
  }

  //get student by id
  @ApiOperation({ summary: 'Get a student by id' })
  @ApiResponse({ status: 200, description: 'Student fetched successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @HttpCode(200)
  @Get(':id')
  getStudentById(@Param('id') id: string) {
    return this.studentsService.getStudentById(id);
  }

  //update student by id
  @ApiOperation({ summary: 'Update a student by id' })
  @ApiResponse({ status: 200, description: 'Student updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @HttpCode(200)
  @Put(':id')
  updateStudentById(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.updateStudentById(id, updateStudentDto);
  }

  //delete student by id
  @ApiOperation({ summary: 'Delete a student by id' })
  @ApiResponse({ status: 200, description: 'Student deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @HttpCode(200)
  @Delete(':id')
  deleteStudentById(@Param('id') id: string) {
    return this.studentsService.deleteStudentById(id);
  }

  //delete bulk students
  @ApiOperation({ summary: 'Delete bulk students' })
  @ApiResponse({ status: 200, description: 'Students deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @HttpCode(200)
  @Delete('bulk')
  deleteBulkStudents(@Body() ids: string[]) {
    return this.studentsService.deleteBulkStudents(ids);
  }

  //delete all students
  @ApiOperation({ summary: 'Delete all students' })
  @ApiResponse({
    status: 200,
    description: 'All students deleted successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @HttpCode(200)
  @Delete()
  deleteAllStudents() {
    return this.studentsService.deleteAllStudents();
  }

  //** Student Address */

  //create student address
  @ApiOperation({ summary: 'Create a student address' })
  @ApiResponse({
    status: 201,
    description: 'Student address created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @HttpCode(201)
  @Post(':id/address')
  createStudentAddress(
    @Param('id') id: string,
    @Body() createStudentAddressDto: CreateStudentAddressDto,
  ) {
    return this.studentsService.createStudentAddress(
      id,
      createStudentAddressDto,
    );
  }

  //update student address by id
  @ApiOperation({ summary: 'Update a student address by id' })
  @ApiResponse({
    status: 200,
    description: 'Student address updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @HttpCode(200)
  @Put(':id/address')
  updateStudentAddressById(
    @Param('id') id: string,
    @Body() updateStudentAddressDto: UpdateStudentAddressDto,
  ) {
    return this.studentsService.updateStudentAddressById(
      id,
      updateStudentAddressDto,
    );
  }

  //delete student address by id
  @ApiOperation({ summary: 'Delete a student address by id' })
  @ApiResponse({
    status: 200,
    description: 'Student address deleted successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @HttpCode(200)
  @Delete(':id/address')
  deleteStudentAddressById(@Param('id') id: string) {
    return this.studentsService.deleteStudentAddressById(id);
  }

  //** Student Parent */

  //create student parent
  @ApiOperation({ summary: 'Create a student parent' })
  @ApiResponse({
    status: 201,
    description: 'Student parent created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @HttpCode(201)
  @Post(':id/parent')
  createStudentParent(
    @Param('id') id: string,
    @Body() createStudentParentDto: CreateStudentParentDto,
  ) {
    return this.studentsService.createStudentParent(id, createStudentParentDto);
  }

  //create bulk student parent
  @ApiOperation({ summary: 'Create bulk student parent' })
  @ApiResponse({
    status: 201,
    description: 'Student parent created successfully',
  })
  @ApiBody({ type: [CreateStudentParentDto] })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @HttpCode(201)
  @Post(':id/parent/bulk')
  createBulkStudentParent(
    @Param('id') id: string,
    @Body() createStudentParentDto: CreateStudentParentDto[],
  ) {
    return this.studentsService.createBulkStudentParent(
      id,
      createStudentParentDto,
    );
  }

  //update student parent by id
  @ApiOperation({ summary: 'Update a student parent by id' })
  @ApiResponse({
    status: 200,
    description: 'Student parent updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @HttpCode(200)
  @Put(':id/parent')
  updateStudentParentById(
    @Param('id') id: string,
    @Body() updateStudentParentDto: UpdateStudentParentDto,
  ) {
    return this.studentsService.updateStudentParentById(
      id,
      updateStudentParentDto,
    );
  }

  //delete student parent by id
  @ApiOperation({ summary: 'Delete a student parent by id' })
  @ApiResponse({
    status: 200,
    description: 'Student parent deleted successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @HttpCode(200)
  @Delete(':id/parent')
  deleteStudentParentById(@Param('id') id: string) {
    return this.studentsService.deleteStudentParentById(id);
  }
}
