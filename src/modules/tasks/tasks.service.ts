import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListsService } from '../list/lists.service';
import { TagsService } from '../tags/tags.service';
import { CreateSubtaskDTO } from './dtos/create-sub-task.dto';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { UpdateSubtaskDTO } from './dtos/update-sub-task.dto';
import { UpdateTaskDTO } from './dtos/update-task.dto';
import { Subtask } from './entities/sub-task.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Subtask)
    private subtasksRepository: Repository<Subtask>,
    private readonly tagsService: TagsService,
    private readonly listsService: ListsService,
  ) {}

  findAll() {
    return this.tasksRepository.find({
      relations: ['subtasks', 'tags', 'list'],
    });
  }

  findById(id: number) {
    return this.tasksRepository.findOne(id, {
      relations: ['subtasks', 'tags', 'list'],
    });
  }

  async create(createTaskDTO: CreateTaskDTO) {
    return this.tasksRepository.save(await this.initializeTask(createTaskDTO));
  }

  async update(id: number, updateTaskDTO: UpdateTaskDTO) {
    return this.tasksRepository.update(
      id,
      await this.initializeTask(updateTaskDTO, id),
    );
  }

  delete(id: number) {
    return this.tasksRepository.softDelete(id);
  }

  async createSubtask(taskId: number, subtaskDTO: CreateSubtaskDTO) {
    const subtask = new Subtask();
    subtask.label = subtaskDTO.label;
    subtask.task = await this.tasksRepository.findOne({ id: taskId });

    return this.subtasksRepository.save(subtask);
  }

  async updateSubtask(
    taskId: number,
    subtaskId: number,
    subtaskDTO: UpdateSubtaskDTO,
  ) {
    const subtask = new Subtask();
    Object.assign(subtask, subtaskDTO);

    subtask.task = await this.tasksRepository.findOne(taskId);
    if (subtaskDTO.completedAt) {
      subtask.completedAt = new Date(subtaskDTO.completedAt);
    }
    return this.subtasksRepository.update(subtaskId, subtask);
  }

  deleteSubtask(subtaskId: number) {
    return this.subtasksRepository.softDelete(subtaskId);
  }

  private async initializeTask(taskDTO: UpdateTaskDTO, id?: number) {
    const task = new Task();
    Object.assign(task, taskDTO);

    if (taskDTO.dueDate) {
      task.dueDate = new Date(taskDTO.dueDate);
    }
    if (taskDTO.completedAt) {
      task.completedAt = new Date(taskDTO.completedAt);
    }
    if (taskDTO.listId) {
      task.list = await this.listsService.findById(taskDTO.listId);
      delete task['listId'];
    }
    if (taskDTO.tagsIds) {
      if (id) {
        const entity = await this.tasksRepository.findOne(id);

        const queryBuilder = this.tasksRepository
          .createQueryBuilder()
          .relation(Task, 'tags')
          .of(entity);

        const currentTags = await queryBuilder.loadMany();
        await queryBuilder.addAndRemove(taskDTO.tagsIds, currentTags);
        delete task['tagsIds'];
      } else {
        task.tags = await Promise.all(
          taskDTO.tagsIds.map((tagId) => this.tagsService.findById(tagId)),
        );
      }
    }
    return task;
  }
}
