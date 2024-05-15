import { Module } from '@nestjs/common/decorators'
import { ExamService } from './exam.service'
import { ExamController } from './exam.controller'
import { UserService } from 'src/user/user.service'
import { SubjectService } from 'src/subject/subject.service'

@Module({
  controllers: [ExamController],
  providers: [ExamService, UserService, SubjectService],
  exports: [ExamService],
})
export class ExamModule {}
