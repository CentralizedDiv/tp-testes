import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { List } from './modules/list/list.entity';
import { Tag } from './modules/tags/tag.entity';
import { TagsModule } from './modules/tags/tags.module';
import { Subtask } from './modules/tasks/entities/sub-task.entity';
import { Task } from './modules/tasks/entities/task.entity';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:
        process.env.NODE_ENV === 'test' ? './test/testingdb.sql' : './db.sql',
      entities: [Tag, List, Task, Subtask],
      synchronize: true,
    }),
    TagsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
