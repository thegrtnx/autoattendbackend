import { Injectable, Global, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { handleResponse } from '..';
import * as argon from 'argon2';

@Global()
@Injectable()
export class HelpHelper {
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

  //helper function to check qrid is valid
  async checkIfQrIdIsValid(qrId: string) {
    const student = await this.prisma.students.findUnique({
      where: { qrId: qrId },
    });

    if (!student) {
      throw new handleResponse(HttpStatus.NOT_FOUND, 'QR ID is not valid');
    }

    return student;
  }

  //helper function to check if userid or email exists
  async checkIfUserExists(id: string) {
    // Try to find by userId first
    let user = await this.prisma.user.findUnique({
      where: { userId: id },
    });

    // If not found by userId, try by email
    if (!user) {
      user = await this.prisma.user.findUnique({
        where: { email: id },
      });
    }

    // If not found by email, try by phone
    if (!user) {
      user = await this.prisma.user.findUnique({
        where: { phone: id },
      });
    }

    if (!user) {
      throw new handleResponse(HttpStatus.NOT_FOUND, 'User not found');
    }

    return user;
  }

  //helper function to check phone
  async checkIfPhoneExists(phone: string) {
    const user = await this.prisma.user.findUnique({
      where: { phone: phone },
    });

    if (!user) {
      throw new handleResponse(HttpStatus.NOT_FOUND, 'Phone not found');
    }

    return user;
  }

  // Helper function to hash password
  hashData = async (data: string) => {
    return await argon.hash(data);
  };

  //helper funtion to verify hashed data
  verifyHashedData = async (hashedData: string, data: string) => {
    return await argon.verify(hashedData, data);
  };

  // Helper function to generate OTP
  generateOtp = async (length: number = 4): Promise<number> => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(min + Math.random() * (max - min + 1));
  };

  // Helper function to generate referral code
  generateRefCode = async (): Promise<string> => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  };

  // Helper function to generate OTP expiration date
  generateOtpExpiration = async (minutes: number = 2): Promise<Date> => {
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + minutes);
    return otpExpiration;
  };
}
