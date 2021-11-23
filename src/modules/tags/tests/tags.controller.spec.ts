import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from 'src/utils/testing-utils';
import { Tag } from '../entity/tag.entity';
import { TagsController } from '../tags.controller';
import { TagsService } from '../tags.service';

describe('TagsController', () => {
  let tagsController: TagsController;
  let tagsService: TagsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(Tag),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    tagsService = moduleRef.get<TagsService>(TagsService);
    tagsController = moduleRef.get<TagsController>(TagsController);
  });

  describe('findAll', () => {
    it('should return an array of Tags', async () => {
      const result = [
        {
          id: 1,
          label: 'Importante',
          color: 'red',
        },
      ];
      jest
        .spyOn(tagsService, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await tagsController.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should return a Tag', async () => {
      const result = {
        id: 1,
        label: 'Importante',
        color: 'red',
      };
      jest
        .spyOn(tagsService, 'create')
        .mockImplementation(() => Promise.resolve(result));

      expect(await tagsController.create(result)).toBe(result);
    });
  });

  describe('findById', () => {
    it('should return a Tag', async () => {
      const result = {
        id: 1,
        label: 'Importante',
        color: 'red',
      };
      jest
        .spyOn(tagsService, 'findById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await tagsController.findById(result.id)).toBe(result);
    });
  });

  describe('update', () => {
    it('should return an update result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };
      jest
        .spyOn(tagsService, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(await tagsController.update(1, {})).toBe(result);
    });
  });

  describe('delete', () => {
    it('should return an delete result', async () => {
      const result = {
        raw: [],
        affected: 1,
      };
      jest
        .spyOn(tagsService, 'delete')
        .mockImplementation(() => Promise.resolve(result));

      expect(await tagsController.delete(1)).toBe(result);
    });
  });
});
