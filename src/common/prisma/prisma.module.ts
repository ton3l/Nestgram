import { Module, Global } from '@nestjs/common';
import { PrismaClient } from 'src/generated/prisma/client';
import { PrismaConfig } from './prisma.config';
import { PrismaConnectionFactory } from './connection.factory';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    PrismaConfig,
    {
      provide: PrismaService,
      useFactory: (prismaConfig: PrismaConfig) => {
        const connectionData = PrismaConnectionFactory.create(prismaConfig);
        return new PrismaService(connectionData);
      },
      inject: [PrismaConfig],
    },
    {
      provide: PrismaClient,
      useExisting: PrismaService,
    }
  ],
  exports: [PrismaService, PrismaClient],
})
export class PrismaModule {}
