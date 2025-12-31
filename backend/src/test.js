import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import pkg from 'pg';
const { Pool } = pkg;


console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function testConnection() {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Banco conectado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao conectar no banco', error.message);
  } finally {
    await pool.end();
  }
}

testConnection();
