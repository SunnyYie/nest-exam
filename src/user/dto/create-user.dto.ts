// 约束接口的数据类型
import { User } from '../entities/user.entity'

export type CreateUserDto = Pick<User, 'created' | 'phone' | 'role' | 'has_person_info' | 'avatar'>

export type UpdateUserDto = Partial<CreateUserDto>
export type SearchUserDto = Partial<CreateUserDto>

export type HttpUserCreate = Pick<User, 'phone' | 'role' | 'avatar' | 'has_person_info'>

// 填写用户信息
export type HttpUserInfoPost = Pick<User, 'name' | 'vChatId' | 'graduation_time' | 'money'> & { avatar?: string }

// export class CreateUserDto {}
