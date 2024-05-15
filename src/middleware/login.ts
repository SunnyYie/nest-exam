import { Injectable } from '@nestjs/common/decorators'
import { NestMiddleware } from '@nestjs/common/interfaces'
import { Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    // if (!req.session || !req.session.login) {
    //   return res.json({
    //     code: 401,
    //     msg: '未登录',
    //   })
    // }
    next()
  }
}
