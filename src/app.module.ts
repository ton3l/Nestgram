import { PrismaModule } from '@prisma-module/prisma.module';
import { AppController } from '@nestgram/app.controller';
import { AppService } from '@nestgram/app.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [PrismaModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
