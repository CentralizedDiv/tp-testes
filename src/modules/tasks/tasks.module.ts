import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListsModule } from '../list/lists.module';
import { TagsModule } from '../tags/tags.module';
import { Subtask } from './entities/sub-task.entity';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Subtask]), TagsModule, ListsModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
