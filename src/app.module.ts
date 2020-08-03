import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import config from 'config/env.config'
import dbConfig from 'config/db.config'
import { TypeOrmProxyModule } from 'modules/typeorm-proxy/typeorm-proxy.module'
import { LoggerModule } from 'modules/logger/logger.module'
import { TaskListModule } from 'modules/task-list/task-list.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot(<TypeOrmModuleOptions>dbConfig),
    TypeOrmProxyModule,
    LoggerModule,
    TaskListModule,
  ],
})
export class AppModule {}
