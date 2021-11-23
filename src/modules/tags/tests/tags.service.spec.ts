import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from 'src/utils/testing-utils';
import { Tag } from '../entity/tag.entity';
import { TagsService } from '../tags.service';

describe('TagsService', () => {
  let tagsService: TagsService;
  const entity: Tag = {
    id: 1,
    label: 'Importante',
    color: 'red',
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
    });
  });

  describe('findById', () => {
    it('should return a Tag', async () => {
      expect(await tagsService.findById(entity.id)).toBe(entity);
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
  });

  describe('delete', () => {
    it('should return an delete result', async () => {
      const result = {
        raw: [],
        affected: 1,
      };

      expect(await tagsService.delete(1)).toStrictEqual(result);
    });
  });
});
