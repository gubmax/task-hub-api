import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  getApp(): string {
    return 'Hello world!!!'
  }
}
