import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TelegramService {
  private readonly token: string;
  private readonly apiUrl: string;
  private readonly chatId: string;

  constructor(private configService: ConfigService) {
    this.token = this.configService.get<string>('TELEGRAM_BOT_TOKEN') || '';
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID') || '';
    this.apiUrl = `https://api.telegram.org/bot${this.token}`;
  }

  async sendMessage(message: string): Promise<void> {
    const url = `${this.apiUrl}/sendMessage`;
    const payload = {
      chat_id: this.chatId,
      text: message,
    };

    try {
      await axios.post(url, payload);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
