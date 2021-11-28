import { ListsService } from './../../list/lists.service';
import { Tag } from './../../tags/tag.entity';
import { TagsService } from './../../tags/tags.service';
import { repositoryMockFactory } from './../../../utils/testing-utils';
import { Subtask } from './../entities/sub-task.entity';
import { TasksService } from './../tasks.service';
import { TasksController } from './../tasks.controller';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task, TaskPriority } from './../entities/task.entity';
import { List } from '../../list/list.entity';

describe('TasksController', () => {
  let taskController: TasksController;

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
    deletedAt: '',
    label: 'Teste tasks',
    completedAt: null,
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
        {
          provide: getRepositoryToken(Subtask),
          useFactory: repositoryMockFactory(subTaskEntity),
        },
        TagsService,
        {
          provide: getRepositoryToken(Tag),
          useFactory: repositoryMockFactory(tagEntity),
        },
        ListsService,
        {
          provide: getRepositoryToken(List),
          useFactory: repositoryMockFactory(listEntity),
        },
        {
          provide: getRepositoryToken(Task),
          useFactory: repositoryMockFactory(taskEntity),
        },
      ],
    }).compile();

    taskController = moduleRef.get<TasksController>(TasksController);
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      expect(await taskController.findAll()).toStrictEqual([taskEntity]);
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

      expect(await taskController.create(task)).toEqual(task);
    });

    it('should return the new subtask', async () => {
      const subtask = {
        label: 'Teste subtasks',
      };
      expect(
        await taskController.createSubtask(taskEntity.id, subtask),
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

      expect(await taskController.update(1, {})).toStrictEqual(result);
    });

    /*it('should return an update subtask result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      const newSubtask = await taskController.createSubtask(1, {
        label: 'Nova subtask',
      });
      expect(
        await taskController.updateSubtask(1, newSubtask.id, {}),
      ).toStrictEqual(result);
    });*/
  });

  describe('findById', () => {
    it('should return a task', async () => {
      expect(await taskController.findById(taskEntity.id)).toStrictEqual(
        taskEntity,
      );
    });

    it('should return undefined on an non-existing task', async () => {
      expect(await taskController.findById(10)).toBe(undefined);
    });
  });

  describe('delete', () => {
    it('should return an delete result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(await taskController.delete(1)).toStrictEqual(result);
    });

    /*it('should return an delete subtask result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      const newSubtask = await taskController.createSubtask(1, {
        label: 'Nova subtask',
      });
      console.log(newSubtask);
      expect(
        await taskController.deleteSubtask(1, newSubtask.id),
      ).toStrictEqual(result);
    });*/
  });
});
