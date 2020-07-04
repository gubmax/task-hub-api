import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import config from 'config/env.config'
import dbConfig from 'config/db.config'
import { LoggerModule } from 'modules/logger/logger.module'
import { TaskListModule } from 'modules/task-list/task-list.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot(<TypeOrmModuleOptions>dbConfig),
    LoggerModule,
    TaskListModule,
  ],
})
export class AppModule {}
