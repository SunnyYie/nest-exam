import { Injectable } from '@nestjs/common/decorators'
import { CreateSubjectDto, HttpSubjectCreate, SearchSubjectDto, UpdateSubjectDto } from './dto/create-subject.dto'
import { DbDeleteData, DbUpdateData, DbListData } from '../db/type'
import { DbCreateData } from 'src/db/type'
import { DbService } from '../db/db.service'

@Injectable()
export class SubjectService {
  constructor(private readonly DbService: DbService) {}

  async create(HttpSubjectCreate: HttpSubjectCreate) {
    const res: DbCreateData = await this.DbService.db.collection('nest-subject').add({
      ...HttpSubjectCreate,
      created: this.DbService.db.serverDate(),
    } as CreateSubjectDto)

    return res
  }

  async find(SearchSubjectDto: SearchSubjectDto) {
    const res: DbListData = await this.DbService.db.collection('nest-subject').where(SearchSubjectDto).get()

    return res
  }

  async update(id: string, UpdateSubjectDto: UpdateSubjectDto) {
    const res: DbUpdateData = await this.DbService.db.collection('nest-subject').doc(id).update(UpdateSubjectDto)
    return res
  }

  async delete(id) {
    const res: DbDeleteData = await this.DbService.db.collection('nest-subject').doc(id).remove()
    return res
  }
}
