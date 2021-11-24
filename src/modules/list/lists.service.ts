import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListDTO } from './dtos/create-list.dto';
import { UpdateListDTO } from './dtos/update-list.dto';
import { List } from './list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: Repository<List>,
  ) {}

  findAll() {
    return this.listsRepository.find({
      relations: ['tasks'],
    });
  }

  findById(id: number) {
    return this.listsRepository.findOne(id, {
      relations: ['tasks'],
    });
  }

  async create(createListDTO: CreateListDTO) {
    return this.listsRepository.save(createListDTO);
  }

  update(id: number, updateListDTO: UpdateListDTO) {
    return this.listsRepository.update(id, updateListDTO);
  }

  delete(id: number) {
    return this.listsRepository.softDelete(id);
  }
}
