import { Module, Global } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GetTaskListQuery } from 'domains/ports/inbound/get-task-list.query'
import { TaskOrmEntity } from './task.orm-entity'
import { TasksAdapterService } from './tasks.adapter'
import { getTasksListProvider } from './tasks.provider'
import { TasksController } from './tasks.controller'

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([TaskOrmEntity]),
  ],
  providers: [
    TasksAdapterService,
    getTasksListProvider,
  ],
  controllers: [TasksController],
  exports: [GetTaskListQuery],
})
export class TasksModule {}
