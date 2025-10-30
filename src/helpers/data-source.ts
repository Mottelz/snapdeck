import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CardEntity } from '../models/card.entity';
import path from 'node:path';
import fs from 'node:fs';

function resolveDir(): string {
  // eslint-disable-next-line no-undef
  const srcPath = path.resolve(__dirname, '../models/cards.db');
  // eslint-disable-next-line no-undef
  const distPath = path.resolve(__dirname, 'cards.db');

  if (fs.existsSync(srcPath)) {
    return srcPath;
  }
  if (fs.existsSync(distPath)) {
    return distPath;
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
