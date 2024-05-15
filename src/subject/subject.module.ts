import { Module } from '@nestjs/common/decorators'
import { SubjectService } from './subject.service'
import { SubjectController } from './subject.controller'
import { UserService } from '../user/user.service';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService, UserService],
  exports: [SubjectService],
})
export class SubjectModule {}
