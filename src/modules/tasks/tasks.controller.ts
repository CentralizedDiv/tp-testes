import {
  Controller,
  Get,
  Post,
  HttpCode,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSubtaskDTO } from './dtos/create-sub-task.dto';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { UpdateSubtaskDTO } from './dtos/update-sub-task.dto';
import { UpdateTaskDTO } from './dtos/update-task.dto';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  @HttpCode(201)
  create(@Body() createTaskDTO: CreateTaskDTO) {
    return this.tasksService.create(createTaskDTO);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.tasksService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDTO: UpdateTaskDTO) {
    return this.tasksService.update(id, updateTaskDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.tasksService.delete(id);
  }

  @Post(':id/sub-tasks')
  @HttpCode(201)
  createSubtask(
    @Param('id') id: number,
    @Body() createSubtaskDTO: CreateSubtaskDTO,
  ) {
    return this.tasksService.createSubtask(id, createSubtaskDTO);
  }

  @Patch(':id/sub-tasks/:subtaskId')
  updateSubtask(
    @Param('id') id: number,
    @Param('subtaskId') subtaskId: number,
    @Body() updateSubtaskDTO: UpdateSubtaskDTO,
  ) {
    return this.tasksService.updateSubtask(id, subtaskId, updateSubtaskDTO);
  }

  @Delete(':id/sub-tasks/:subtaskId')
  deleteSubtask(
    @Param('id') _id: number,
    @Param('subtaskId') subtaskId: number,
  ) {
    return this.tasksService.deleteSubtask(subtaskId);
  }
}
