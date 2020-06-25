import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from 'app.controller'
import configuration from 'config/env.config'

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  })],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
