import { PrismaConnectionFactory } from '@prisma-module/connection.factory';
import { PrismaService } from '@prisma-module/prisma.service';
import { PrismaConfig } from '@prisma-module/prisma.config';
import { PrismaClient } from '@prisma-client/client';
import { Module, Global } from '@nestjs/common';

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
        },
    ],
    exports: [PrismaService, PrismaClient],
})
export class PrismaModule {}
