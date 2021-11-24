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
import { CreateListDTO } from './dtos/create-list.dto';
import { UpdateListDTO } from './dtos/update-list.dto';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  findAll() {
    return this.listsService.findAll();
  }

  @Post()
  @HttpCode(201)
  create(@Body() createListDTO: CreateListDTO) {
    return this.listsService.create(createListDTO);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.listsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateListDTO: UpdateListDTO) {
    return this.listsService.update(id, updateListDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.listsService.delete(id);
  }
}
