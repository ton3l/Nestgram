import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import type { SqlDriverAdapterFactory as DriverAdapter } from '@prisma/client/runtime/client';
import { PrismaClient } from '../../generated/prisma/client';

export interface DbConnectionData {
  readonly adapter: DriverAdapter;
  readonly onInit?: () => Promise<void>;
  readonly onDestroy?: () => Promise<void>;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly connectionData: DbConnectionData) {
    super({ adapter: connectionData.adapter });
  }

  async onModuleInit() {
    await this.$connect();
    if (this.connectionData.onInit) {
      await this.connectionData.onInit();
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    if (this.connectionData.onDestroy) {
      await this.connectionData.onDestroy();
    }
  }
}
