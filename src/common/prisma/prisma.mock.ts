import { PrismaClient } from '@prisma-client/client';
import { mockDeep } from 'jest-mock-extended';

export const prismaMock = mockDeep<PrismaClient>();

export const PrismaMockProvider = {
    provide: PrismaClient,
    useValue: prismaMock,
};

/* Needs the following configs in package.json:
    "jest": {
        "moduleNameMapper": {
            "^src/(.*)$": "<rootDir>/$1",
            "^(\\.{1,2}/.*)\\.js$": "$1"
        },
    }
*/
