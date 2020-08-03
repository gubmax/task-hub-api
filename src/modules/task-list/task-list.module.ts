import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GetTaskListQuery } from 'domains/ports/inbound/get-task-list.query'
import { AddTaskUseCase } from 'domains/ports/inbound/add-task.use-case'
import { RemoveTaskUseCase } from 'domains/ports/inbound/remove-task.use-case'
import { TaskOrmDto } from 'dto/task/task.orm-dto'
import { TypeOrmProxyModule } from 'modules/typeorm-proxy/typeorm-proxy.module'
import { TaskListAdapter } from './task-list.adapter'
import { TaskListController } from './task-list.controller'
import { getTaskListProvider, addTaskProvider, removeTaskProvider } from './task-list.provider'

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskOrmDto]),
    TypeOrmProxyModule,
  ],
  providers: [
    TaskListAdapter,
    getTaskListProvider,
    addTaskProvider,
    removeTaskProvider,
  ],
  controllers: [TaskListController],
  exports: [GetTaskListQuery, AddTaskUseCase, RemoveTaskUseCase],
})
export class TaskListModule {}
