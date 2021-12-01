import { ListsService } from '../../list/lists.service';
import { Tag } from '../../tags/tag.entity';
import { TagsService } from '../../tags/tags.service';
import { repositoryMockFactory } from '../../../utils/testing-utils';
import { Subtask } from '../entities/sub-task.entity';
import { TasksService } from '../tasks.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task, TaskPriority } from '../entities/task.entity';
import { List } from '../../list/list.entity';

describe('TasksController', () => {
  let tasksService: TasksService;

  const taskEntity: Task = {
    label: 'Escrever teste',
    description: 'Testes de unidade para o tp',
    dueDate: null,
    completedAt: null,
    list: null,
    subtasks: [
      {
        id: 2,
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
        label: 'Teste tasks',
        completedAt: null,
        task: null,
      },
    ],
    tags: null,
    priority: TaskPriority.MEDIUM,
    id: 1,
    createdAt: '',
    updatedAt: '',
    deletedAt: null,
  };

  const subTaskEntity: Subtask = {
    id: 1,
    createdAt: '',
    updatedAt: '',
    label: 'Teste tasks',
    completedAt: null,
    deletedAt: null,
    task: taskEntity,
  };

  const tagEntity: Tag = {
    id: 1,
    label: 'Importante',
    color: 'red',
    tasks: [],
    createdAt: '',
    updatedAt: '',
    deletedAt: null,
  };

  const listEntity: List = {
    id: 1,
    label: 'Lîsta teste',
    description: '',
    dueDate: null,
    tasks: [taskEntity],
    createdAt: '',
    updatedAt: '',
    deletedAt: null,
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TasksService,
        TagsService,
        ListsService,
        {
          provide: getRepositoryToken(Task),
          useFactory: repositoryMockFactory(taskEntity),
        },
        {
          provide: getRepositoryToken(Subtask),
          useFactory: repositoryMockFactory(subTaskEntity),
        },
        {
          provide: getRepositoryToken(Tag),
          useFactory: repositoryMockFactory(tagEntity),
        },
        {
          provide: getRepositoryToken(List),
          useFactory: repositoryMockFactory(listEntity),
        },
      ],
    }).compile();

    tasksService = moduleRef.get<TasksService>(TasksService);
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      expect(await tasksService.findAll()).toStrictEqual([taskEntity]);
    });
  });

  describe('findById', () => {
    it('should return a task', async () => {
      expect(await tasksService.findById(taskEntity.id)).toStrictEqual(
        taskEntity,
      );
    });

    it('should return undefined on an non-existing task', async () => {
      expect(await tasksService.findById(10)).toBe(undefined);
    });
  });

  describe('create', () => {
    it('should return the created task', async () => {
      const task = {
        id: 2,
        label: 'Escrever teste',
        description: 'Testes de unidade para o tp',
        dueDate: null,
        completedAt: null,
        list: null,
        subtasks: null,
        tags: null,
        priority: TaskPriority.HIGH,
      };

      expect(await tasksService.create(task)).toEqual(task);
    });

    it('should return the new subtask', async () => {
      const subtask = {
        label: 'Teste subtasks',
      };
      expect(await tasksService.createSubtask(taskEntity.id, subtask)).toEqual(
        subtask,
      );
    });
  });

  describe('update', () => {
    it('should return an update result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(await tasksService.update(taskEntity.id, {})).toStrictEqual(
        result,
      );
    });

    it('should affect 0 rows on update task with undefined id', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 0,
      };

      const undefinedId = 10;
      expect(await tasksService.update(undefinedId, {})).toStrictEqual(result);
    });

    it('should return an update subtask result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(
        await tasksService.updateSubtask(taskEntity.id, subTaskEntity.id, {}),
      ).toStrictEqual(result);
    });

    it('should affect 0 rows on update subtask with undefined id', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 0,
      };

      const undefinedId = 10;
      expect(
        await tasksService.updateSubtask(taskEntity.id, undefinedId, {}),
      ).toStrictEqual(result);
    });
  });

  describe('delete', () => {
    it('should return an delete result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(await tasksService.delete(taskEntity.id)).toStrictEqual(result);
    });

    it('should affect 0 rows on delete task with undefined id', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 0,
      };

      const undefinedId = 10;
      expect(await tasksService.delete(undefinedId)).toStrictEqual(result);
    });

    it('should return an delete subtask result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(await tasksService.deleteSubtask(taskEntity.id)).toStrictEqual(
        result,
      );
    });

    it('should affect 0 rows on delete subtask with undefined id', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 0,
      };

      const undefinedId = 10;
      expect(await tasksService.deleteSubtask(undefinedId)).toStrictEqual(
        result,
      );
    });
  });
});
