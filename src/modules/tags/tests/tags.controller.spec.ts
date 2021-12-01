import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from 'src/utils/testing-utils';
import { Tag } from '../tag.entity';
import { TagsController } from '../tags.controller';
import { TagsService } from '../tags.service';

describe('TagsController', () => {
  let tagsController: TagsController;
  const entity: Tag = {
    id: 1,
    label: 'Importante',
    color: 'red',
    tasks: [],
    createdAt: '',
    updatedAt: '',
    deletedAt: null,
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(Tag),
          useFactory: repositoryMockFactory(entity),
        },
      ],
    }).compile();

    tagsController = moduleRef.get<TagsController>(TagsController);
  });

  describe('findAll', () => {
    it('should return an array of Tags', async () => {
      expect(await tagsController.findAll()).toStrictEqual([entity]);
    });
  });

  describe('create', () => {
    it('should return a Tag', async () => {
      const result = {
        id: 2,
        label: 'Importante2',
        color: 'red',
        tasks: [],
        createdAt: '',
        updatedAt: '',
        deletedAt: null,
      };
      expect(await tagsController.create(result)).toBe(result);
    });
  });

  describe('findById', () => {
    it('should return a Tag', async () => {
      expect(await tagsController.findById(entity.id)).toStrictEqual(entity);
    });

    it('should return undefined', async () => {
      const undefinedId = 10;
      expect(await tagsController.findById(undefinedId)).toBe(undefined);
    });
  });

  describe('update', () => {
    it('should return an update result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(await tagsController.update(entity.id, {})).toStrictEqual(result);
    });

    it('should affect 0 rows', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 0,
      };

      const undefinedId = 10;
      expect(await tagsController.update(undefinedId, {})).toStrictEqual(
        result,
      );
    });
  });

  describe('delete', () => {
    it('should return an delete result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(await tagsController.delete(1)).toStrictEqual(result);
    });

    it('should affect 0 rows', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 0,
      };

      const undefinedId = 10;
      expect(await tagsController.delete(undefinedId)).toStrictEqual(result);
    });
  });
});
