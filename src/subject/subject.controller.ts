import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common/decorators'
import { HttpSubjectCreate, OneSubjectType, SearchSubjectDto, UpdateSubjectDto } from './dto/create-subject.dto'
import { DbDeleteData, DbUpdateData, DbListData } from '../db/type'
import { HttpRes } from '../types/http'
import { SubjectService } from './subject.service'
import { UserService } from '../user/user.service'
import { Roles } from 'src/role'
import { Role } from 'src/role/role.enum'

type Tree = {
  title: string
  value: string
}
interface TreeData<T> {
  _id: string
  title: string
  value: string
  children: T[]
}

@Controller('api/subject')
export class SubjectController {
  constructor(
    private readonly subjectService: SubjectService,
    private readonly userService: UserService,
  ) {}

  @Get()
  // 获取当前用户的所有课程
  async getAll(@Req() request: any) {
    const user_db: DbListData = await this.userService.find({
      _id: request?.session?.user_id || '',
    } as SearchSubjectDto)

    const user = user_db.data[0]
    const topic_role = user?.topic_role || []

    const res = await this.subjectService.find({} as any)
    const all_two_arr = res.data

    const data = {}
    const tree_arr: TreeData<Tree>[] = []

    all_two_arr.forEach((item) => {
      if (!data[item.one_key]) {
        data[item.one_key] = [item]
      } else {
        data[item.one_key].push(item)
      }
    })

    Object.keys(data).map((item) => {
      const two_arr = data[item]
      let id

      const tree_two_arr = two_arr.map((item) => {
        let can_exam = false
        id = item._id

        if (topic_role && topic_role.includes(item._id)) {
          can_exam = true
        } else {
          can_exam = false
        }

        return {
          title: item.two_name,
          value: item._id,
          topic_list: item?.topic_list || [],
          can_exam,
        }
      })

      tree_arr.push({
        _id: id,
        title: item,
        value: item,
        children: tree_two_arr,
      })
    })

    return {
      code: 0,
      msg: 'ok',
      data: tree_arr,
    } as HttpRes<TreeData<Tree>[]>
  }

  // 创建课程
  @Post('/two')
  @Roles(Role.super_admin, Role.admin)
  async create(@Body() HttpSubjectCreate: HttpSubjectCreate) {
    const data = await this.subjectService.create(HttpSubjectCreate)

    return {
      code: 0,
      msg: 'ok',
      data,
    } as HttpRes<Object>
  }

  @Post('/search')
  async find(@Body() search_data: SearchSubjectDto) {
    const data = await this.subjectService.find(search_data)

    return {
      code: 0,
      msg: 'ok',
      data: data.data,
    } as HttpRes<any[]>
  }

  @Get('/one')
  findOneSubject() {
    const data: OneSubjectType = [
      {
        name: '基础',
        key: 'basic',
      },
      {
        name: 'react',
        key: 'react',
      },
      {
        name: 'vue',
        key: 'vue',
      },
      {
        name: 'nodejs',
        key: 'nodejs',
      },
      {
        name: 'webgl',
        key: 'webgl',
      },
      {
        name: '工程化',
        key: 'webpack',
      },
      {
        name: '自动化运维',
        key: 'devops',
      },
    ]

    return {
      code: 0,
      msg: 'ok',
      data,
    } as HttpRes<OneSubjectType>
  }

  // 更新课程
  @Patch('/two/:two_id')
  async update(@Param('two_id') two_id: string, @Body() UpdateSubjectDto: UpdateSubjectDto) {
    const res: DbUpdateData = await this.subjectService.update(two_id, UpdateSubjectDto)

    return {
      code: 0,
      msg: 'ok',
      data: res,
    } as HttpRes<Object>
  }

  @Delete('/two/:id')
  async remove(@Param('id') id: string) {
    const res: DbDeleteData = await this.subjectService.delete(id)

    return {
      code: 0,
      msg: 'ok',
      data: res,
    } as HttpRes<Object>
  }
}
