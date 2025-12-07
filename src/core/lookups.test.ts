import {
  getAllCards,
  getCardByIdentifier,
  getCardByCardDefId,
  getCardByShortName,
  getCardsByCardDefIds,
  getCardsByShortNames,
} from './lookups';
import getDataSource from '../helpers/data-source';
import { CardEntity } from '../models/card.entity';
import { DataSource } from 'typeorm';

// Mock the data source
jest.mock('../helpers/data-source');
const mockGetDataSource = getDataSource as jest.MockedFunction<typeof getDataSource>;

// Mock repository methods
const mockFind = jest.fn();
const mockFindOne = jest.fn();
const mockRepository = {
  find: mockFind,
  findOne: mockFindOne,
};

// Mock data source
const mockDataSource = {
  getRepository: jest.fn().mockReturnValue(mockRepository),
} as unknown as DataSource;

describe('Card Lookups', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetDataSource.mockResolvedValue(mockDataSource);
  });

  const mockCardEntities: CardEntity[] = [
    {
      cardDefId: 'Apocalypse',
      name: 'Apocalypse',
      power: '8',
      cost: '6',
      obtainable: true,
      description: 'When you discard this, put it back with +4 Power.',
      releaseDate: new Date('0001-01-01T00:00:00.000Z'),
      shortName: 'ApclpsA',
    },
    {
      cardDefId: 'Blade',
      name: 'Blade',
      power: '3',
      cost: '1',
      obtainable: true,
      description: 'On Reveal: Discard the rightmost card from your hand.',
      releaseDate: new Date('0001-01-01T00:00:00.000Z'),
      shortName: 'Bld5',
    },
    {
      cardDefId: 'ColleenWing',
      name: 'Colleen Wing',
      power: '3',
      cost: '2',
      obtainable: true,
      description: 'On Reveal: Discard the card that costs the least from your hand.',
      releaseDate: new Date('0001-01-01T00:00:00.000Z'),
      shortName: 'CllnWngB',
    },
  ];

  describe('getAllCards', () => {
    it('should return all cards from the database', async () => {
      // arrange
      mockFind.mockResolvedValue(mockCardEntities);

      // act
      const result = await getAllCards();

      // assert
      expect(mockGetDataSource).toHaveBeenCalled();
      expect(mockDataSource.getRepository).toHaveBeenCalledWith(CardEntity);
      expect(mockFind).toHaveBeenCalled();
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        cardDefId: 'Apocalypse',
        name: 'Apocalypse',
        power: '8',
        cost: '6',
        obtainable: true,
        description: 'When you discard this, put it back with +4 Power.',
        releaseDate: new Date('0001-01-01T00:00:00.000Z'),
        shortName: 'ApclpsA',
      });
    });

    it('should return empty array when no cards exist', async () => {
      // arrange
      mockFind.mockResolvedValue([]);

      // act
      const result = await getAllCards();

      // assert
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('getCardByIdentifier', () => {
    it('should find card by cardDefId', async () => {
      // arrange
      mockFindOne.mockResolvedValueOnce(mockCardEntities[0]);

      // act
      const result = await getCardByIdentifier('Apocalypse');

      // assert
      expect(mockFindOne).toHaveBeenCalledWith({
        where: { cardDefId: 'Apocalypse' },
      });
      expect(result).toEqual({
        cardDefId: 'Apocalypse',
        name: 'Apocalypse',
        power: '8',
        cost: '6',
        obtainable: true,
        description: 'When you discard this, put it back with +4 Power.',
        releaseDate: new Date('0001-01-01T00:00:00.000Z'),
        shortName: 'ApclpsA',
      });
    });

    it('should find card by shortName when cardDefId fails', async () => {
      // arrange
      mockFindOne
        .mockResolvedValueOnce(null) // First call (cardDefId) returns null
        .mockResolvedValueOnce(mockCardEntities[0]); // Second call (shortName) returns card

      // act
      const result = await getCardByIdentifier('ApclpsA');

      // assert
      expect(mockFindOne).toHaveBeenCalledTimes(2);
      expect(mockFindOne).toHaveBeenNthCalledWith(1, {
        where: { cardDefId: 'ApclpsA' },
      });
      expect(mockFindOne).toHaveBeenNthCalledWith(2, {
        where: { shortName: 'ApclpsA' },
      });
      expect(result).toEqual({
        cardDefId: 'Apocalypse',
        name: 'Apocalypse',
        power: '8',
        cost: '6',
        obtainable: true,
        description: 'When you discard this, put it back with +4 Power.',
        releaseDate: new Date('0001-01-01T00:00:00.000Z'),
        shortName: 'ApclpsA',
      });
    });

    it('should return null when card is not found by either identifier', async () => {
      // arrange
      mockFindOne.mockResolvedValue(null);

      // act
      const result = await getCardByIdentifier('NonExistentCard');

      // assert
      expect(mockFindOne).toHaveBeenCalledTimes(2);
      expect(result).toBeNull();
    });
  });

  describe('getCardByCardDefId', () => {
    it('should find card by cardDefId', async () => {
      // arrange
      mockFindOne.mockResolvedValue(mockCardEntities[1]);

      // act
      const result = await getCardByCardDefId('Blade');

      // assert
      expect(mockFindOne).toHaveBeenCalledWith({
        where: { cardDefId: 'Blade' },
      });
      expect(result).toEqual({
        cardDefId: 'Blade',
        name: 'Blade',
        power: '3',
        cost: '1',
        obtainable: true,
        description: 'On Reveal: Discard the rightmost card from your hand.',
        releaseDate: new Date('0001-01-01T00:00:00.000Z'),
        shortName: 'Bld5',
      });
    });

    it('should return null when cardDefId is not found', async () => {
      // arrange
      mockFindOne.mockResolvedValue(null);

      // act
      const result = await getCardByCardDefId('NonExistentCard');

      // assert
      expect(result).toBeNull();
    });
  });

  describe('getCardByShortName', () => {
    it('should find card by shortName', async () => {
      // arrange
      mockFindOne.mockResolvedValue(mockCardEntities[2]);

      // act
      const result = await getCardByShortName('CllnWngB');

      // assert
      expect(mockFindOne).toHaveBeenCalledWith({
        where: { shortName: 'CllnWngB' },
      });
      expect(result).toEqual({
        cardDefId: 'ColleenWing',
        name: 'Colleen Wing',
        power: '3',
        cost: '2',
        obtainable: true,
        description: 'On Reveal: Discard the card that costs the least from your hand.',
        releaseDate: new Date('0001-01-01T00:00:00.000Z'),
        shortName: 'CllnWngB',
      });
    });

    it('should return null when shortName is not found', async () => {
      // arrange
      mockFindOne.mockResolvedValue(null);

      // act
      const result = await getCardByShortName('NonExistentShortName');

      // assert
      expect(result).toBeNull();
    });
  });

  describe('getCardsByCardDefIds', () => {
    it('should find multiple cards by cardDefIds', async () => {
      // arrange
      const selectedCards = [mockCardEntities[0], mockCardEntities[1]];
      mockFind.mockResolvedValue(selectedCards);

      // act
      const result = await getCardsByCardDefIds(['Apocalypse', 'Blade']);

      // assert
      expect(mockFind).toHaveBeenCalledWith({
        where: [{ cardDefId: 'Apocalypse' }, { cardDefId: 'Blade' }],
      });
      expect(result).toHaveLength(2);
      expect(result[0].cardDefId).toBe('Apocalypse');
      expect(result[1].cardDefId).toBe('Blade');
    });

    it('should return empty array when no cards are found', async () => {
      // arrange
      mockFind.mockResolvedValue([]);

      // act
      const result = await getCardsByCardDefIds(['NonExistent1', 'NonExistent2']);

      // assert
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should return partial results when some cards are found', async () => {
      // arrange
      mockFind.mockResolvedValue([mockCardEntities[0]]);

      // act
      const result = await getCardsByCardDefIds(['Apocalypse', 'NonExistentCard']);

      // assert
      expect(result).toHaveLength(1);
      expect(result[0].cardDefId).toBe('Apocalypse');
    });

    it('should handle empty array input', async () => {
      // arrange
      mockFind.mockResolvedValue([]);

      // act
      const result = await getCardsByCardDefIds([]);

      // assert
      expect(mockFind).toHaveBeenCalledWith({
        where: [],
      });
      expect(result).toEqual([]);
    });
  });

  describe('getCardsByShortNames', () => {
    it('should find multiple cards by shortNames', async () => {
      // arrange
      const selectedCards = [mockCardEntities[0], mockCardEntities[2]];
      mockFind.mockResolvedValue(selectedCards);

      // act
      const result = await getCardsByShortNames(['ApclpsA', 'CllnWngB']);

      // assert
      expect(mockFind).toHaveBeenCalledWith({
        where: [{ shortName: 'ApclpsA' }, { shortName: 'CllnWngB' }],
      });
      expect(result).toHaveLength(2);
      expect(result[0].shortName).toBe('ApclpsA');
      expect(result[1].shortName).toBe('CllnWngB');
    });

    it('should return empty array when no cards are found', async () => {
      // arrange
      mockFind.mockResolvedValue([]);

      // act
      const result = await getCardsByShortNames(['NonExistent1', 'NonExistent2']);

      // assert
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should return partial results when some cards are found', async () => {
      // arrange
      mockFind.mockResolvedValue([mockCardEntities[1]]);

      // act
      const result = await getCardsByShortNames(['Bld5', 'NonExistentShortName']);

      // assert
      expect(result).toHaveLength(1);
      expect(result[0].shortName).toBe('Bld5');
    });

    it('should handle empty array input', async () => {
      // arrange
      mockFind.mockResolvedValue([]);

      // act
      const result = await getCardsByShortNames([]);

      // assert
      expect(mockFind).toHaveBeenCalledWith({
        where: [],
      });
      expect(result).toEqual([]);
    });
  });

  describe('database integration', () => {
    it('should handle database errors gracefully', async () => {
      // arrange
      mockFind.mockRejectedValue(new Error('Database connection failed'));

      // act & assert
      await expect(getAllCards()).rejects.toThrow('Database connection failed');
    });

    it('should ensure data source is called for each function', async () => {
      // arrange
      mockFind.mockResolvedValue([]);
      mockFindOne.mockResolvedValue(null);

      // act
      await getAllCards();
      await getCardByIdentifier('test');
      await getCardByCardDefId('test');
      await getCardByShortName('test');
      await getCardsByCardDefIds(['test']);
      await getCardsByShortNames(['test']);

      // assert
      expect(mockGetDataSource).toHaveBeenCalledTimes(6);
      expect(mockDataSource.getRepository).toHaveBeenCalledTimes(6);
    });
  });
});
