import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const now = new Date();

const pad = (value) => String(value).padStart(2, '0');
const dateDir = `${pad(now.getDate())}-${months[now.getMonth()]}-${now.getFullYear()}`;
const hourDir = `${pad(now.getHours())}-00`;
const fileName = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}.log`;

const logDir = path.join(process.cwd(), 'logs', dateDir, hourDir);
const logFilePath = path.join(logDir, fileName);

fs.mkdirSync(logDir, { recursive: true });
const stream = fs.createWriteStream(logFilePath, { flags: 'a' });

const write = (chunk) => {
  const text = chunk.toString();
  process.stdout.write(text);
  stream.write(text);
};

const child = spawn('npx', ['vite'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: process.platform === 'win32',
});

stream.write(`[${new Date().toISOString()}] [SRS-ui-client] Run log file: ${logFilePath}\n`);

child.stdout.on('data', write);
child.stderr.on('data', write);

const shutdown = (code) => {
  stream.write(`[${new Date().toISOString()}] [SRS-ui-client] Process exited with code ${code}\n`);
  stream.end();
  process.exit(code ?? 0);
};

child.on('close', shutdown);
process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
