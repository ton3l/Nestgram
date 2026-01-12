import { AppController } from '@nestgram/app.controller';
import { AppService } from '@nestgram/app.service';
import { Module } from '@nestjs/common';

@Module({
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
