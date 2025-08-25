import { HttpStatus, Injectable } from '@nestjs/common';
import { SignupDto } from 'src/dto';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { handleResponse } from 'src/utils';
import { HelpHelper } from 'src/utils/helpers/help.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpHelper: HelpHelper,
  ) {}

  async createUser(signupDto: SignupDto) {
    //check if email exists
    await this.helpHelper.checkIfUserExists(signupDto.email);

    //check if phone exists
    await this.helpHelper.checkIfPhoneExists(signupDto.phone);

    //generate otp and otp expiration date
    const otp = await this.helpHelper.generateOtp();
    const otpExpiration = await this.helpHelper.generateOtpExpiration();

    //hash password
    const hashedPassword = await this.helpHelper.hashData(signupDto.password);

    //create user
    const user = await this.prisma.user.create({
      data: {
        ...signupDto,
        password: hashedPassword,
        otp: otp.toString(),
        otpExpiredAt: otpExpiration,
      },
    });

    return new handleResponse(
      HttpStatus.CREATED,
      'User created successfully',
      user,
    ).getResponse();
  }
}
