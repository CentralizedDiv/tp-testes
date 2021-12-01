import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from 'src/utils/testing-utils';
import { List } from '../list.entity';
import { ListsController } from '../LISTS.controller';
import { ListsService } from '../lists.service';

describe('ListsController', () => {
  let listsController: ListsController;
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
      controllers: [ListsController],
      providers: [
        ListsService,
        {
          provide: getRepositoryToken(List),
          useFactory: repositoryMockFactory(entity),
        },
      ],
    }).compile();

    listsController = moduleRef.get<ListsController>(ListsController);
  });

  describe('findAll', () => {
    it('should return an array of Lists', async () => {
      expect(await listsController.findAll()).toStrictEqual([entity]);
    });
  });

  describe('create', () => {
    it('should return a created List', async () => {
      expect(await listsController.create(entity)).toBe(entity);
    });
  });

  describe('findById', () => {
    it('should return a List', async () => {
      expect(await listsController.findById(entity.id)).toStrictEqual(entity);
    });
  });

  describe('update', () => {
    it('should return an update result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(await listsController.update(1, {})).toStrictEqual(result);
    });
  });

  describe('delete', () => {
    it('should return an delete result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(await listsController.delete(1)).toStrictEqual(result);
    });
  });
});
