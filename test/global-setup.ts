import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

export default async () => {
  dotenv.config({ path: '.env.test.local' });
  execSync('npx prisma db push');
};
