import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTagDTO, UpdateTagDTO } from './dtos/create-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Post()
  @HttpCode(201)
  create(@Body() createTagDTO: CreateTagDTO) {
    return this.tagsService.create(createTagDTO);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.tagsService.findById(id);
  }

  @Put(':id')
  @HttpCode(201)
  update(@Param('id') id: number, @Body() updateTagDTO: UpdateTagDTO) {
    return this.tagsService.update(id, updateTagDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.tagsService.delete(id);
  }
}
