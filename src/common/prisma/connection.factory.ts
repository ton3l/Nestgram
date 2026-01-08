import type { DbConnectionData } from './prisma.service';
import { PrismaClient } from 'src/generated/prisma/client';
import { PrismaConfig } from './prisma.config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

export class PrismaConnectionFactory {
  static create(config: PrismaConfig): DbConnectionData {
    const protocol = config.getDatabaseProtocol();

    switch (protocol) {
      case 'postgresql':
        return this.getPostgresConnection(config);

      case 'mysql':
        return this.getMariaDbConnection(config);

      default:
        throw new Error(`Unsupported database protocol: ${protocol}`);
    }
  }

  private static getPostgresConnection(config: PrismaConfig): DbConnectionData {
    const connectionString = config.getDatabaseUrl();
    const schema = config.getDatabaseSchema();

    return {
      adapter: new PrismaPg({ connectionString }, { schema }),
      cleanDb: this.postgresCleanDb.bind(null, schema),
    };
  }

  private static getMariaDbConnection(config: PrismaConfig): DbConnectionData {
    const connectionString = config.getDatabaseUrl() + '?allowPublicKeyRetrieval=true';

    return {
      adapter: new PrismaMariaDb(connectionString),
      cleanDb: this.mySqlCleanDb,
    };
  }

  private static async postgresCleanDb(schema: string, prisma: PrismaClient) {
    const tables = await prisma.$queryRawUnsafe<Array<{ tablename: string }>>(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = '${schema}' 
      AND tablename != '_prisma_migrations';
    `);

    const tableNames = tables.map((t) => `"${schema}"."${t.tablename}"`).join(', ');

    if (tableNames.length > 0) {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tableNames} RESTART IDENTITY CASCADE;`);
    }
  }

  private static async mySqlCleanDb(prisma: PrismaClient) {
    const tables = await prisma.$queryRawUnsafe<Array<{ table_name: string }>>(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = DATABASE() 
      AND table_name != '_prisma_migrations';
    `);

    await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;');
    for (const table of tables) {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${table.table_name};`);
    }
    await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;');
  }
}
