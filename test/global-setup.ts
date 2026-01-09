import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

export default () => {
    dotenv.config({ path: '.env.test.local' });
    execSync('npx prisma db push');
};
