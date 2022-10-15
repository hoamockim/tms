import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

@Injectable()
export class ConfigService {
  private readonly env: { [key: string]: any } = null;

  constructor() {
    this.env = {};
    this.env.accountService = {
      options: {
        port: process.env.ACCOUNT_SERVICE_PORT,
        host: process.env.ACCOUNT_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };

    this.env.notiService = {
      options: {
        port: process.env.NOTI_SERVICE_PORT,
        host: process.env.NOTI_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  public get(key: string): any {
    return this.env[key];
  }
}
