import { ExamCollectionType } from '../entities/exam.entity'

export type CreateExamDto = Pick<ExamCollectionType, 'topic_list' | 'two_id' | 'user_id' | 'is_judge' | 'created' | 'user_name'>

export type UpdateExamDto = Partial<CreateExamDto>
export type SearchExamDto = Partial<ExamCollectionType>

export type HttpExamCreate = Pick<ExamCollectionType, 'topic_list' | 'two_id'>
