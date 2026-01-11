import { AppService } from '@nestgram/app.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    async getHello() {
        return await this.appService.getHello();
    }
}
