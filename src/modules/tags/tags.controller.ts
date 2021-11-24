import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTagDTO } from './dtos/create-tag.dto';
import { UpdateTagDTO } from './dtos/update-tag.dto';
import { TagsService } from './tags.service';
@ApiTags('Tags')
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

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTagDTO: UpdateTagDTO) {
    return this.tagsService.update(id, updateTagDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.tagsService.delete(id);
  }
}
