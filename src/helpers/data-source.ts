import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CardEntity } from '../models/card.entity';
import path from 'node:path';
import fs from 'node:fs';

function resolveDir(): string {
  // Try multiple possible database locations
  const possiblePaths = [
    // During development (src structure)
    path.join(process.cwd(), 'src', 'models', 'cards.db'),
    // After build (dist structure)
    path.join(process.cwd(), 'dist', 'models', 'cards.db'),
    path.join(process.cwd(), 'dist', 'helpers', 'cards.db'),
    // Node modules installation
    path.join(__dirname || process.cwd(), '..', 'models', 'cards.db'),
    path.join(__dirname || process.cwd(), 'cards.db'),
    // Fallback to current directory
    path.join(process.cwd(), 'cards.db'),
  ];

  // Return the first path that exists
  for (const dbPath of possiblePaths) {
    if (fs.existsSync(dbPath)) {
      return dbPath;
    }
  }

  return '';
}

const AppDataSource = new DataSource({
  type: 'sqlite',

  database: resolveDir(),
  logging: true,
  entities: [CardEntity],
});

export default async function getDataSource(): Promise<DataSource> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}
