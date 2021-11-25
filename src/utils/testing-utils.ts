import { BaseEntity } from './common.entity';

export const repositoryMockFactory = <T extends BaseEntity>(
  initialEntity: T,
) => {
  const bd: T[] = [initialEntity];

  const find = jest.fn(() => bd.filter((entity) => entity.deletedAt === null));
  const findOne = jest.fn((id: number) =>
    find().find((entity) => entity.id === id),
  );

  return jest.fn(() => ({
    find,
    findOne,
    save: jest.fn((entity) => {
      bd.push(entity);
      return entity;
    }),
    update: jest.fn((id, partialEntity: Partial<T>) => {
      let entity = findOne(id);
      let affected = 0;
      if (entity) {
        entity = {
          ...entity,
          partialEntity,
        };
        affected = 1;
      }
      return {
        raw: [],
        generatedMaps: [],
        affected,
      };
    }),
    softDelete: jest.fn((id) => {
      const entity = findOne(id);
      let affected = 0;
      if (entity) {
        entity.deletedAt = 'fake_date';
        affected = 1;
      }
      return {
        raw: [],
        generatedMaps: [],
        affected,
      };
    }),
  }));
};
