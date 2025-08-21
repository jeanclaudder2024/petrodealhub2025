import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from "@shared/schema";

console.log('Initializing development database with SQLite...');

// For development, use SQLite instead of PostgreSQL
const sqlite = new Database('dev.db');

export const db = drizzle(sqlite, { schema });

console.log('Connected to SQLite database');

export function getActiveDb() {
  return db;
}
