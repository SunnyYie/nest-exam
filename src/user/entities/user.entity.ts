export class User {
  created: Date;
  name: string;
  vChatId: string;
  phone: number;
  avatar: string;
  // 毕业时间
  graduation_time: string;
  money: number;
  role: string;
  _id: string;
  has_person_info: boolean;
  // 可以参加哪些课程的考试
  topic_role: []
  edu: string;
  // 技术栈
  techStack: string;
}
