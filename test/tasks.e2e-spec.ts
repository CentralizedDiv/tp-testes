import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Repository, getConnection } from 'typeorm';
import { Task, TaskPriority } from 'src/modules/tasks/entities/task.entity';

describe('Tasks (e2e)', () => {
  let app: INestApplication;
  let tasksRepository: Repository<Task>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const connection = getConnection();
    tasksRepository = connection.getRepository(Task);

    await request(app.getHttpServer()).post('/tasks').send({
      label: 'Escrever teste',
      description: 'Testes de unidade para o tp',
      dueDate: null,
      tags: null,
      listId: null,
      priority: TaskPriority.MEDIUM,
    });
    await request(app.getHttpServer())
      .post('/tasks/1/sub-tasks')
      .send({ label: 'tasks e2e tests' });
  });

  afterAll(async () => {
    await tasksRepository.query('delete from subtask');
    await tasksRepository.query(
      "delete from sqlite_sequence where name='subtask'",
    );
    await tasksRepository.query('delete from task');
    await tasksRepository.query(
      "delete from sqlite_sequence where name='task'",
    );
    await app.close();
  });

  it('should return a task array', (done) => {
    request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .then((response) => response.body)
      .then((response) => {
        expect(response).toHaveLength(1);
        done();
      })
      .catch((err) => done(err));
  });

  it('should return a specific task', (done) => {
    request(app.getHttpServer())
      .get('/tasks/1')
      .expect(200)
      .then((response) => response.body)
      .then((response) => {
        expect(response.label).toBe('Escrever teste');
        done();
      })
      .catch((err) => done(err));
  });

  it('should update a task', (done) => {
    request(app.getHttpServer())
      .patch('/tasks/1')
      .send({
        label: 'Testes e2e',
      })
      .then(() => {
        request(app.getHttpServer())
          .get('/tasks/1')
          .expect(200)
          .then((response) => response.body)
          .then((response) => {
            expect(response.label).toBe('Testes e2e');
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });

  it('should update a subtask', (done) => {
    request(app.getHttpServer())
      .patch('/tasks/1/sub-tasks/1')
      .send({ label: 'tasks e2e tests - updated' })
      .then(() => {
        request(app.getHttpServer())
          .get('/tasks/1')
          .expect(200)
          .then((response) => response.body)
          .then((response) => {
            expect(response.subtasks[0].label).toBe(
              'tasks e2e tests - updated',
            );
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });

  it('should delete a subtask', (done) => {
    request(app.getHttpServer())
      .delete('/tasks/1/sub-tasks/1')
      .send({ label: 'tasks e2e tests - updated' })
      .then(() => {
        request(app.getHttpServer())
          .get('/tasks/1')
          .expect(200)
          .then((response) => response.body)
          .then((response) => {
            expect(response.subtasks).toHaveLength(0);
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });

  it('should delete a task', (done) => {
    request(app.getHttpServer())
      .delete('/tasks/1')
      .then(() => {
        request(app.getHttpServer())
          .get('/tasks')
          .expect(200)
          .then(async (response) => response.body)
          .then((response) => {
            expect(response).toHaveLength(0);
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });
});
