export const repositoryMockFactory = (entity: unknown) =>
  jest.fn(() => ({
    find: jest.fn(() => [entity]),
    findOne: jest.fn(() => entity),
    save: jest.fn((entity) => entity),
    update: jest.fn(() => ({ raw: [], generatedMaps: [], affected: 1 })),
    delete: jest.fn(() => ({ raw: [], affected: 1 })),
  }));
