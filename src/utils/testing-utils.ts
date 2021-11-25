export const repositoryMockFactory = (entity: unknown) =>
  jest.fn(() => ({
    find: jest.fn(() => [entity]),
    findOne: jest.fn(() => entity),
    save: jest.fn((entity) => entity),
    update: jest.fn(() => ({ raw: [], generatedMaps: [], affected: 1 })),
    softDelete: jest.fn(() => ({ raw: [], generatedMaps: [], affected: 1 })),
  }));
