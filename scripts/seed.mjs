// scripts/seed.mjs
import postgres from 'postgres';
import fs from 'fs';
import path from 'path';

function getDatabaseUri() {
  try {
    const envLocal = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
    const match = envLocal.match(/^SUPABASE_DATABASE_URI=(.*)$/m);
    if (match && match[1]) {
      // Remove surrounding quotes if they exist
      return match[1].replace(/["']/g, '');
    }
    throw new Error('SUPABASE_DATABASE_URI not found or is empty in .env.local');
  } catch (err) {
    console.error('❌ Error reading .env.local file. Make sure it exists and contains a valid SUPABASE_DATABASE_URI.');
    process.exit(1);
  }
}

async function main() {
  const dbUrl = getDatabaseUri();

  console.log('---');
  console.log('🌱 Starting database seed...');
  console.log('---');

  const sql = postgres(dbUrl);

  try {
    console.log('📄 Reading seed.sql file...');
    const seedSql = fs.readFileSync(path.join(process.cwd(), 'supabase/seed.sql'), 'utf8');

    console.log('🚀 Executing seed script on remote database...');
    await sql.unsafe(seedSql);

    console.log('✅ Database seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();