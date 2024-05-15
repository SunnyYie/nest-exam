import { Injectable } from '@nestjs/common/decorators'
import { UpdateExamDto } from './dto/create-exam.dto'
import { DbService } from '../db/db.service'
import { DbCreateData, DbListData, DbDeleteData, DbUpdateData } from 'src/db/type'
import { DbLimitListData } from '../db/type'
import { UserService } from 'src/user/user.service'
import { SubjectService } from 'src/subject/subject.service'

@Injectable()
export class ExamService {
  constructor(
    private readonly DbService: DbService,
    private readonly UserService: UserService,
    private readonly SubjectService: SubjectService,
  ) {}

  async create(createExamDto: any) {
    const user_res: DbListData = await this.UserService.find({
      _id: createExamDto.user_id,
    })
    const user = user_res.data[0]

    const subject_res: DbListData = await this.SubjectService.find({
      _id: createExamDto.two_id,
    })
    const subject = subject_res.data[0]

    const res: DbCreateData = await this.DbService.db.collection('nest-exam').add({
      ...createExamDto,
      user_name: user?.name || 'sxc',
      subject_name: subject.two_name,
    })

    return res
  }

  async find(data) {
    const search_params = {
      ...data,
    }

    delete search_params.skip
    delete search_params.limit

    const count_res = await this.DbService.db.collection('nest-exam').where(search_params).count()
    const count = count_res.total

    const res: DbLimitListData = await this.DbService.db
      .collection('nest-exam')
      .where(search_params)
      .skip(data.skip || 0)
      .limit(data.limit || 10)
      .get()

    res.count = count

    return res
  }

  async update(id: string, UpdateExamDto: UpdateExamDto) {
    const res: DbUpdateData = await this.DbService.db.collection('nest-exam').doc(id).update(UpdateExamDto)
    return res
  }

  async delete(id: string) {
    const res: DbDeleteData = await this.DbService.db.collection('nest-exam').doc(id).remove()
    return res
  }
}
