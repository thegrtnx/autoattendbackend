import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import * as QRCode from 'qrcode';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { handleResponse } from 'src/utils';

@Injectable()
export class QrService {
  constructor(private readonly cloudinary: CloudinaryService) {}

  /**
   * Generates a QR code PNG for the given text, uploads to Cloudinary,
   * and returns the secure URL.
   */
  async createAndUploadQr(
    text: string,
    folder = 'attendance/qr',
    width = 384,
  ): Promise<{ url: string; publicId: string }> {
    if (!text?.trim())
      throw new handleResponse(HttpStatus.BAD_REQUEST, 'text is required');

    // 1) Make PNG buffer
    const png = await QRCode.toBuffer(text, {
      width,
      errorCorrectionLevel: 'M',
      margin: 1,
    });

    // 2) Upload to Cloudinary (your service de-dupes by file hash)
    const result = await this.cloudinary.uploadImage(png, folder);

    // 3) Return the saved URL + public_id
    return { url: result.secure_url, publicId: result.public_id };
  }
}
