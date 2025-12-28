import { Module, Global } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaConfig } from './prisma.config';
import { PrismaConnectionFactory } from './connection.factory';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    PrismaConfig,
    {
      provide: PrismaClient,
      useFactory: (prismaConfig: PrismaConfig) => {
        const connectionData = PrismaConnectionFactory.create(prismaConfig);
        return new PrismaService(connectionData);
      },
      inject: [PrismaConfig],
    },
  ],
  exports: [PrismaClient],
})
export class PrismaModule {}
