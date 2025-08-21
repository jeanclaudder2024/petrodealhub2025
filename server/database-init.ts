import { db } from './db.js';
import { sql } from 'drizzle-orm';
import { storage } from './storage.js';

export async function initializeCustomAuthTables() {
  try {
    console.log('Checking database connection...');
    
    // For SQLite, we'll use a different approach to check connectivity
    try {
      const result = await db.select({ value: sql`1` });
      if (result.length === 0) throw new Error('Database connection test failed');
      console.log('Connected to SQLite database');
    } catch (error) {
      console.error('Database connection check failed:', error);
      throw error;
    }
    
    // For development with SQLite, we'll create simplified tables
    console.log('Initializing development tables for SQLite');
    
    // Create missing subscriptions table if it doesn't exist
    try {
      // Use Drizzle ORM instead of raw SQL for SQLite compatibility
      // The table should already be defined in the schema
      // We'll just log that we're using the existing schema
      console.log('Using existing schema definition for subscriptions table');
    } catch (error) {
      console.log('Subscriptions table creation skipped:', error);
    }

    console.log('Skipping broker membership columns for SQLite development');

    // Create broker tables
    try {
      // Skip broker tables creation for SQLite development
      console.log('Skipping broker tables creation for SQLite development');
    } catch (error) {
      console.log('Broker tables creation skipped:', error);
    }

    // Create broker_deal_messages table
    try {
      // Skip broker_deal_messages table creation for SQLite development
      console.log('Skipping broker_deal_messages table creation for SQLite development');
    } catch (error) {
      console.log('Broker deal messages table creation skipped:', error);
    }

    // Initialize subscription plans
    try {
      // Skip subscription plans initialization for SQLite development
      console.log('Skipping subscription plans initialization for SQLite development');
    } catch (error) {
      console.log('Subscription plans initialization skipped:', error);
    }
    
  } catch (error) {
    console.error('Error initializing custom auth tables:', error);
    throw error;
  }
}