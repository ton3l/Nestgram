import { PrismaService } from '@prisma-module/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    constructor(private readonly prisma: PrismaService) {}

    async getHello() {
    	console.log(await this.prisma.post.findMany());
        return 'Hello World!';
    }
}
