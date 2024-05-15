import { Subject } from '../entities/subject.entity'

export type CreateSubjectDto = Pick<Subject, 'one_key' | 'two_name' | 'created'>
export type UpdateSubjectDto = Partial<CreateSubjectDto>
export type SearchSubjectDto = Partial<Subject>
export type HttpSubjectCreate = Pick<Subject, 'one_key' | 'two_name' |'topic_list'>

// 一级分类
export type OneSubjectType = {
  name: string
  key: string
}[]
