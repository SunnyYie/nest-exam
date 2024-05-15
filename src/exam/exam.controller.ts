import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common/decorators'
import { UpdateExamDto, SearchExamDto, HttpExamCreate } from './dto/create-exam.dto'
import { DbDeleteData, DbUpdateData, DbListData, DbCreateData, DbLimitListData } from '../db/type'
import { HttpRes } from '../types/http'
import { Role } from '../role/role.enum'
import { DbService } from '../db/db.service'
import { ExamService } from './exam.service'
import { Roles } from 'src/role'

@Controller('api/exam')
export class ExamController {
  constructor(
    private readonly examService: ExamService,
    private readonly DbService: DbService,
  ) {}

  // 查询考试历史记录
  @Post()
  async getExamList(@Body() body: any, @Req() request: any) {
    const role: Role = request.session.role || 'admin'
    const user_id = request.session.user_id

    const params = {
      ...body,
    }

    if (role === Role.student) {
      Object.assign(params, { user_id })
    }

    const res = await this.examService.find(params)

    return {
      code: 0,
      msg: 'ok',
      data: res.data,
      count: res.count,
    }
  }

  @Get('/:exam_id')
  async getExamSingle(@Param('exam_id') exam_id: string) {
    const res: DbListData = await this.examService.find({
      _id: exam_id,
    } as SearchExamDto)

    return {
      code: 0,
      msg: 'ok',
      data: res.data[0],
    }
  }

  // 创建考试记录
  @Post('/create')
  async create(@Body() createExamDto: HttpExamCreate, @Req() request: any) {
    const user_id: string = request?.session?.user_id || '111'
    const data: DbCreateData = await this.examService.create({
      ...createExamDto,
      user_id,
      is_judge: false,
      created: this.DbService.db.serverDate(),
    })

    return {
      code: 0,
      msg: 'ok',
      data,
    } as HttpRes<Object>
  }

  @Post('/search')
  @Roles(Role.admin, Role.super_admin)
  async find(@Body() data: SearchExamDto) {
    const res = await this.examService.find(data)

    return {
      code: 0,
      msg: 'ok',
      data: res.data,
    } as HttpRes<any[]>
  }

  // 批阅试卷
  @Patch(':id')
  @Roles(Role.admin, Role.super_admin)
  async update(@Param('id') id: string, @Body() UpdateExamDto: UpdateExamDto) {
    const res: DbUpdateData = await this.examService.update(id, {
      ...UpdateExamDto,
      is_judge: true,
    })

    return {
      code: 0,
      msg: 'ok',
      data: res,
    } as HttpRes<Object>
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res: DbDeleteData = await this.examService.delete(id)

    return {
      code: 0,
      msg: 'ok',
      data: res,
    } as HttpRes<Object>
  }
}
