import { Injectable } from '@nestjs/common/decorators'
import { CreateTopicDto, UpdateTopicDto, HttpTopicCreate } from './dto/create-topic.dto'
import { DbService } from '../db/db.service'
import { DbCreateData, DbListData, DbDeleteData, DbUpdateData } from 'src/db/type'

@Injectable()
export class TopicService {
  constructor(private readonly DbService: DbService) {}

  async create(HttpTopicCreate: HttpTopicCreate) {
    const res: DbCreateData = await this.DbService.db.collection('exam-topic').add({
      ...HttpTopicCreate,
      created: this.DbService.db.serverDate(),
    } as CreateTopicDto)

    return res
  }

  async find(data) {
    const res: DbListData = await this.DbService.db.collection('exam-topic').where(data).get()
    return res
  }

  async update(id: string, UpdateTopicDto: UpdateTopicDto) {
    const res: DbUpdateData = await this.DbService.db.collection('exam-topic').doc(id).update(UpdateTopicDto)
    return res
  }

  async delete(id: string) {
    const res: DbDeleteData = await this.DbService.db.collection('exam-topic').doc(id).remove()
    return res
  }
}
