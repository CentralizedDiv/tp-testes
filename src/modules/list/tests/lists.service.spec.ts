import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from 'src/utils/testing-utils';
import { List } from '../list.entity';
import { ListsService } from '../lists.service';

describe('ListsService', () => {
  let listsService: ListsService;
  const entity: List = {
    id: 1,
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
    label: 'Importante',
    description: 'Descrição',
    dueDate: null,
    tasks: null
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ListsService,
        {
          provide: getRepositoryToken(List),
          useFactory: repositoryMockFactory(entity),
        },
      ],
    }).compile();

    listsService = moduleRef.get<ListsService>(ListsService);
  });

  describe('findAll', () => {
    it('should return an array of Lists', async () => {
      expect(await listsService.findAll()).toStrictEqual([entity]);
    });
  });

  describe('create', () => {
    it('should return a List', async () => {
      expect(await listsService.create(entity)).toBe(entity);
      expect(await listsService.findAll()).toHaveLength(2);
    });
  });

  describe('findById', () => {
    it('should return a List', async () => {
      expect(await listsService.findById(entity.id)).toBe(entity);
    });
  });

  describe('update', () => {
    it('should return an update result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(await listsService.update(1, {})).toStrictEqual(result);
    });
  });

  describe('delete', () => {
    it('should return an delete result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(await listsService.delete(1)).toStrictEqual(result);
      expect(await listsService.findAll()).toHaveLength(0);
    });
  });
});
