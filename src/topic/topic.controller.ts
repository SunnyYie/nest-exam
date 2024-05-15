import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common/decorators'
import { UpdateTopicDto, HttpTopicCreate, SearchTopicDto } from './dto/create-topic.dto'
import { DbDeleteData, DbUpdateData, DbCreateData } from '../db/type'
import { HttpRes } from '../types/http'
import { TopicService } from './topic.service'

@Controller('api/topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  async create(@Body() HttpTopicCreate: HttpTopicCreate) {
    const data: DbCreateData = await this.topicService.create(HttpTopicCreate)

    return {
      code: 0,
      msg: 'ok',
      data,
    } as HttpRes<any>
  }

  @Get('/:subject_two_id')
  async find(@Param('subject_two_id') subject_two_id: string) {
    const res = await this.topicService.find({
      two_id: subject_two_id,
    } as SearchTopicDto)

    return {
      code: 0,
      msg: 'ok',
      data: res.data,
    } as HttpRes<any[]>
  }

  @Patch('/:two_id')
  async update(@Param('two_id') two_id: string, @Body() UpdateTopicDto: UpdateTopicDto) {
    const res: DbUpdateData = await this.topicService.update(two_id, UpdateTopicDto)

    return {
      code: 0,
      msg: 'ok',
      data: res,
    } as HttpRes<Object>
  }

  @Delete('/:two_id')
  async remove(@Param('two_id') two_id: string) {
    const res: DbDeleteData = await this.topicService.delete(two_id)

    return {
      code: 0,
      msg: 'ok',
      data: res,
    } as HttpRes<Object>
  }
}
