import { TopicCollectionType } from '../entities/topic.entity'

export type CreateTopicDto = Pick<TopicCollectionType, 'two_id' | 'title' | 'dec' | 'img' | 'created'>

export type UpdateTopicDto = Partial<CreateTopicDto>
export type SearchTopicDto = Partial<TopicCollectionType>

export type HttpTopicCreate = Pick<TopicCollectionType, 'two_id' | 'title' | 'dec' | 'img'>
