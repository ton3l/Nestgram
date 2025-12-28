import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaConfig {
  private readonly databaseUrl: string;

  constructor() {
    const url = process.env.DATABASE_URL;

    if (!url) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }

    this.databaseUrl = url;
  }

  getDatabaseUrl(): string {
    return this.databaseUrl;
  }

  getDatabaseProtocol(): string {
    return this.databaseUrl.split(':')[0];
  }
}
