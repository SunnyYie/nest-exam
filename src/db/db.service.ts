const tcb = require('@cloudbase/node-sdk')

export type DbType = {
  // 连接数据库
  collection: (doc: string) => any
  // 服务器时间
  serverDate: () => Date
}

export class DbService {
  db: DbType
  constructor() {
    console.log('数据库连接成功')

    const app = tcb.init({
      env: '',
      region: '',
      secretId: '',
      secretKey: '',
    })
    this.db = app.database()
  }
}
