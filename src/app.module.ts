import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import config from 'config/env.config'
import dbConfig from 'config/db.config'
import { TasksModule } from 'modules/tasks/tasks.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot(<TypeOrmModuleOptions>dbConfig),
    TasksModule,
  ],
})
export class AppModule {}
