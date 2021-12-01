import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from 'src/utils/testing-utils';
import { Tag } from '../tag.entity';
import { TagsService } from '../tags.service';

describe('TagsService', () => {
  let tagsService: TagsService;
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
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(Tag),
          useFactory: repositoryMockFactory(entity),
        },
      ],
    }).compile();

    tagsService = moduleRef.get<TagsService>(TagsService);
  });

  describe('findAll', () => {
    it('should return an array of Tags', async () => {
      expect(await tagsService.findAll()).toStrictEqual([entity]);
    });
  });

  describe('create', () => {
    it('should return a Tag', async () => {
      expect(await tagsService.create(entity)).toBe(entity);
      expect(await tagsService.findAll()).toHaveLength(2);
    });
  });

  describe('findById', () => {
    it('should return a Tag', async () => {
      expect(await tagsService.findById(entity.id)).toBe(entity);
    });

    it('should return undefined', async () => {
      const undefinedId = 10;
      expect(await tagsService.findById(undefinedId)).toBe(undefined);
    });
  });

  describe('update', () => {
    it('should return an update result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(await tagsService.update(1, {})).toStrictEqual(result);
    });

    it('should affect 0 rows', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 0,
      };

      const undefinedId = 10;
      expect(await tagsService.update(undefinedId, {})).toStrictEqual(result);
    });
  });

  describe('delete', () => {
    it('should return an delete result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(await tagsService.delete(1)).toStrictEqual(result);
      expect(await tagsService.findAll()).toHaveLength(0);
    });

    it('should affect 0 rows', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 0,
      };

      const undefinedId = 10;
      expect(await tagsService.delete(undefinedId)).toStrictEqual(result);
    });
  });
});
