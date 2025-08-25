import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { HelpHelper } from 'src/utils/helpers/help.helper';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpHelper: HelpHelper,
  ) {}
}
