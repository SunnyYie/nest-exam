import { Injectable } from '@nestjs/common/decorators'
import { DbService } from './db/db.service'

@Injectable()
export class AppService {
  constructor(private readonly dbService: DbService) {}

  // getHello(): string {
  //   return 'Hello World!';
  // }
  getHello() {
    const res = this.dbService.db.collection('mcgdg-exam1').add({
      name: 'test',
      age: 18,
    })

    return res
  }
}
