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

        if (process.env.NODE_ENV === 'test') {
            this.validateTestDatabase();
        }
    }

    getDatabaseUrl(): string {
        return this.databaseUrl;
    }

    getDatabaseProtocol(): string {
        return this.databaseUrl.split(':')[0];
    }

    getDatabaseSchema(): string {
        if (this.getDatabaseProtocol() !== 'postgresql') {
            throw new Error('Database schema only exists for PostgreSQL databases');
        }

        const schemaMatch = this.databaseUrl.match(/schema=([^&]+)/);
        return schemaMatch ? schemaMatch[1] : 'public';
    }

    private validateTestDatabase(): void {
        if (!this.databaseUrl.includes('test')) {
            throw new Error('DATABASE_URL seems not point to a test database');
        }
    }
}
