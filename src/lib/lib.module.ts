import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { QrModule } from './qrcodeGen/qr.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, QrModule, CloudinaryModule],
})
export class LibModule {}
