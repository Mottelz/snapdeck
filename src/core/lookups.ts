import { CardEntity } from '../models/card.entity';
import Card from '../models/card.type';
import getDataSource from '../helpers/data-source';

/**
 * Get all cards from the database
 * @returns Promise<Card[]> - Array of all cards
 */
export async function getAllCards(): Promise<Card[]> {
  const dataSource = await getDataSource();
  const cardRepository = dataSource.getRepository(CardEntity);

  const cardEntities = await cardRepository.find();

  // Convert CardEntity to Card interface
  return cardEntities.map((entity) => ({
    cardDefId: entity.cardDefId,
    name: entity.name,
    power: entity.power,
    cost: entity.cost,
    obtainable: entity.obtainable,
    description: entity.description,
    releaseDate: entity.releaseDate,
    shortName: entity.shortName,
  }));
}

/**
 * Get a specific card by cardDefId or shortName
 * @param identifier - The cardDefId or shortName to search for
 * @returns Promise<Card | null> - The found card or null if not found
 */
export async function getCardByIdentifier(identifier: string): Promise<Card | null> {
  const dataSource = await getDataSource();
  const cardRepository = dataSource.getRepository(CardEntity);

  // Try to find by cardDefId first, then by shortName
  let cardEntity = await cardRepository.findOne({
    where: { cardDefId: identifier },
  });

  if (!cardEntity) {
    cardEntity = await cardRepository.findOne({
      where: { shortName: identifier },
    });
  }

  if (!cardEntity) {
    return null;
  }

  // Convert CardEntity to Card interface
  return {
    cardDefId: cardEntity.cardDefId,
    name: cardEntity.name,
    power: cardEntity.power,
    cost: cardEntity.cost,
    obtainable: cardEntity.obtainable,
    description: cardEntity.description,
    releaseDate: cardEntity.releaseDate,
    shortName: cardEntity.shortName,
  };
}

/**
 * Get a specific card by cardDefId
 * @param cardDefId - The cardDefId to search for
 * @returns Promise<Card | null> - The found card or null if not found
 */
export async function getCardByCardDefId(cardDefId: string): Promise<Card | null> {
  const dataSource = await getDataSource();
  const cardRepository = dataSource.getRepository(CardEntity);

  const cardEntity = await cardRepository.findOne({
    where: { cardDefId },
  });

  if (!cardEntity) {
    return null;
  }

  // Convert CardEntity to Card interface
  return {
    cardDefId: cardEntity.cardDefId,
    name: cardEntity.name,
    power: cardEntity.power,
    cost: cardEntity.cost,
    obtainable: cardEntity.obtainable,
    description: cardEntity.description,
    releaseDate: cardEntity.releaseDate,
    shortName: cardEntity.shortName,
  };
}

/**
 * Get a specific card by shortName
 * @param shortName - The shortName to search for
 * @returns Promise<Card | null> - The found card or null if not found
 */
export async function getCardByShortName(shortName: string): Promise<Card | null> {
  const dataSource = await getDataSource();
  const cardRepository = dataSource.getRepository(CardEntity);

  const cardEntity = await cardRepository.findOne({
    where: { shortName },
  });

  if (!cardEntity) {
    return null;
  }

  // Convert CardEntity to Card interface
  return {
    cardDefId: cardEntity.cardDefId,
    name: cardEntity.name,
    power: cardEntity.power,
    cost: cardEntity.cost,
    obtainable: cardEntity.obtainable,
    description: cardEntity.description,
    releaseDate: cardEntity.releaseDate,
    shortName: cardEntity.shortName,
  };
}

/**
 * Get multiple cards by their cardDefIds
 * @param cardDefIds - Array of cardDefIds to search for
 * @returns Promise<Card[]> - Array of found cards
 */
export async function getCardsByCardDefIds(cardDefIds: string[]): Promise<Card[]> {
  const dataSource = await getDataSource();
  const cardRepository = dataSource.getRepository(CardEntity);

  const cardEntities = await cardRepository.find({
    where: cardDefIds.map((id) => ({ cardDefId: id })),
  });

  // Convert CardEntity to Card interface
  return cardEntities.map((entity) => ({
    cardDefId: entity.cardDefId,
    name: entity.name,
    power: entity.power,
    cost: entity.cost,
    obtainable: entity.obtainable,
    description: entity.description,
    releaseDate: entity.releaseDate,
    shortName: entity.shortName,
  }));
}

/**
 * Get multiple cards by their shortNames
 * @param shortNames - Array of shortNames to search for
 * @returns Promise<Card[]> - Array of found cards
 */
export async function getCardsByShortNames(shortNames: string[]): Promise<Card[]> {
  const dataSource = await getDataSource();
  const cardRepository = dataSource.getRepository(CardEntity);

  const cardEntities = await cardRepository.find({
    where: shortNames.map((name) => ({ shortName: name })),
  });

  // Convert CardEntity to Card interface
  return cardEntities.map((entity) => ({
    cardDefId: entity.cardDefId,
    name: entity.name,
    power: entity.power,
    cost: entity.cost,
    obtainable: entity.obtainable,
    description: entity.description,
    releaseDate: entity.releaseDate,
    shortName: entity.shortName,
  }));
}
