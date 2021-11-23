import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDTO, UpdateTagDTO } from './dtos/create-tag.dto';
import { Tag } from './entity/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  findAll() {
    return this.tagsRepository.find();
  }

  findById(id: number) {
    return this.tagsRepository.findOne(id);
  }

  create(createTagDTO: CreateTagDTO) {
    return this.tagsRepository.save(createTagDTO);
  }

  update(id: number, updateTagDTO: UpdateTagDTO) {
    return this.tagsRepository.update(id, updateTagDTO);
  }

  delete(id: number) {
    return this.tagsRepository.delete(id);
  }
}
