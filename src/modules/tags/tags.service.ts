import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDTO } from './dtos/create-tag.dto';
import { UpdateTagDTO } from './dtos/update-tag.dto';
import { Tag } from './tag.entity';

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
    return this.tagsRepository.softDelete(id);
  }
}
