import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { getConnection, Repository } from 'typeorm';
import { Tag } from 'src/modules/tags/tag.entity';

describe('Tags Controller (e2e)', () => {
  let app: INestApplication;
  let tagsRepository: Repository<Tag>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const connection = getConnection();
    tagsRepository = connection.getRepository(Tag);

    await request(app.getHttpServer()).post('/tags').send({
      label: 'Importante',
      color: 'red',
    });
  });

  afterAll(async () => {
    await tagsRepository.query('delete from tag');
    await tagsRepository.query("delete from sqlite_sequence where name='tag'");
    await app.close();
  });

  it('should return a tag array', (done) => {
    request(app.getHttpServer())
      .get('/tags')
      .expect(200)
      .then((response) => response.body)
      .then((response) => {
        expect(response).toHaveLength(1);
        done();
      })
      .catch((err) => done(err));
  });

  it('should return a specific tag', (done) => {
    request(app.getHttpServer())
      .get('/tags/1')
      .expect(200)
      .then(async (response) => {
        return response.body;
      })
      .then((response) => {
        expect(response.label).toBe('Importante');
        done();
      })
      .catch((err) => done(err));
  });

  it('should update a tag', (done) => {
    request(app.getHttpServer())
      .patch('/tags/1')
      .send({
        label: 'Menos Importante',
      })
      .then(() => {
        request(app.getHttpServer())
          .get('/tags/1')
          .expect(200)
          .then(async (response) => {
            return response.body;
          })
          .then((response) => {
            expect(response.label).toBe('Menos Importante');
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });

  it('should delete a tag', (done) => {
    request(app.getHttpServer())
      .delete('/tags/1')
      .then(() => {
        request(app.getHttpServer())
          .get('/tags')
          .expect(200)
          .then(async (response) => {
            return response.body;
          })
          .then((response) => {
            expect(response).toHaveLength(0);
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });
});
