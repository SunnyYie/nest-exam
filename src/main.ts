import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 设置session中间件
  app.use(
    session({
      secret: 'mcgdg',
      resave: false,
      saveUninitialized: false,
    }),
  )

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  })

  await app.listen(8080)
}
bootstrap()
