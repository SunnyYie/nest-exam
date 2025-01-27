export type ExamCollectionType = {
  topic_list: any[] // 题目列表
  two_id: string // 二级课程类目id
  user_id: string //用户id
  subject_name:string // 一级课程类目
  is_judge: boolean // 是否批改
  _id: string
  created: Date // 考试时间
  user_name: string // 用户花名
}
