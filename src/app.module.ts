import { MiddlewareConsumer } from '@nestjs/common/interfaces'
import { RequestMethod } from '@nestjs/common/enums'
import { Module } from '@nestjs/common/decorators'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DbModule } from './db/db.module'
import { UserModule } from './user/user.module'
import { LoggerMiddleware } from './middleware/login'
import { SubjectModule } from './subject/subject.module'
import { TopicModule } from './topic/topic.module'
import { ExamModule } from './exam/exam.module'
import { RolesGuard } from './role/role.guard'

const RoleGuardProvider = {
  provide: 'APP_GUARD',
  useClass: RolesGuard,
}

@Module({
  imports: [DbModule, UserModule, SubjectModule, TopicModule, ExamModule],
  controllers: [AppController],
  providers: [AppService, RoleGuardProvider],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // // 使用 cors 中间件，并配置 options
    // const corsOptions = {
    //   origin: '*',
    //   credentials: true, // 允许携带凭证
    // }

    consumer
      .apply(LoggerMiddleware,)
      // 不用去校验
      .exclude(
        {
          path: '/api/user/login',
          method: RequestMethod.ALL,
        },
        {
          path: '/api/user/logout',
          method: RequestMethod.ALL,
        },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      })
  }
}
