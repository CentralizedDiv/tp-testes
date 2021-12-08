import { ListsService } from 'src/modules/list/lists.service';
import { Tag } from 'src/modules/tags/tag.entity';
import { TagsService } from 'src/modules/tags/tags.service';
import { repositoryMockFactory } from 'src/utils/testing-utils';
import { Subtask } from 'src/modules/tasks/entities/sub-task.entity';
import { TasksService } from 'src/modules/tasks/tasks.service';
import { TasksController } from 'src/modules/tasks/tasks.controller';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task, TaskPriority } from 'src/modules/tasks/entities/task.entity';
import { List } from 'src/modules/list/list.entity';

describe('TasksController', () => {
  let tasksController: TasksController;

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
      controllers: [TasksController],
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

    tasksController = moduleRef.get<TasksController>(TasksController);
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      expect(await tasksController.findAll()).toStrictEqual([taskEntity]);
    });
  });

  describe('findById', () => {
    it('should return a task', async () => {
      expect(await tasksController.findById(taskEntity.id)).toStrictEqual(
        taskEntity,
      );
    });

    it('should return undefined on an non-existing task', async () => {
      expect(await tasksController.findById(10)).toBe(undefined);
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

      expect(await tasksController.create(task)).toEqual(task);
    });

    it('should return the new subtask', async () => {
      const subtask = {
        label: 'Teste subtasks',
      };
      expect(
        await tasksController.createSubtask(taskEntity.id, subtask),
      ).toEqual(subtask);
    });
  });

  describe('update', () => {
    it('should return an update result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(await tasksController.update(taskEntity.id, {})).toStrictEqual(
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
      expect(await tasksController.update(undefinedId, {})).toStrictEqual(
        result,
      );
    });

    it('should return an update subtask result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(
        await tasksController.updateSubtask(
          taskEntity.id,
          subTaskEntity.id,
          {},
        ),
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
        await tasksController.updateSubtask(taskEntity.id, undefinedId, {}),
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

      expect(await tasksController.delete(taskEntity.id)).toStrictEqual(result);
    });

    it('should affect 0 rows on delete task with undefined id', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 0,
      };

      const undefinedId = 10;
      expect(await tasksController.delete(undefinedId)).toStrictEqual(result);
    });

    it('should return an delete subtask result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(
        await tasksController.deleteSubtask(taskEntity.id, subTaskEntity.id),
      ).toStrictEqual(result);
    });

    it('should affect 0 rows on delete subtask with undefined id', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 0,
      };

      const undefinedId = 10;
      expect(
        await tasksController.deleteSubtask(taskEntity.id, undefinedId),
      ).toStrictEqual(result);
    });
  });
});
