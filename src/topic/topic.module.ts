import { Module } from '@nestjs/common/decorators';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';

@Module({
  controllers: [TopicController],
  providers: [TopicService],
  exports: [TopicService],
})
export class TopicModule {}
