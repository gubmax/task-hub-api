import { FactoryProvider } from '@nestjs/common'

import { GetTaskListService } from 'domains/services/get-task-list.service'
import { GetTaskListQuery } from 'domains/ports/inbound/get-task-list.query'
import { AddTaskUseCase } from 'domains/ports/inbound/add-task.use-case'
import { AddTaskService } from 'domains/services/add-task.service'
import { RemoveTaskUseCase } from 'domains/ports/inbound/remove-task.use-case'
import { RemoveTaskService } from 'domains/services/remove-task.service'
import { TaskListAdapter } from './task-list.adapter'

export const getTaskListProvider: FactoryProvider<GetTaskListService> = {
  provide: GetTaskListQuery,
  useFactory: (taskListAdapter: TaskListAdapter) => (
    new GetTaskListService(taskListAdapter)
  ),
  inject: [TaskListAdapter],
}

export const addTaskProvider: FactoryProvider<AddTaskService> = {
  provide: AddTaskUseCase,
  useFactory: (taskListAdapter: TaskListAdapter) => (
    new AddTaskService(taskListAdapter)
  ),
  inject: [TaskListAdapter],
}

export const removeTaskProvider: FactoryProvider<RemoveTaskUseCase> = {
  provide: RemoveTaskUseCase,
  useFactory: (taskListAdapter: TaskListAdapter) => (
    new RemoveTaskService(taskListAdapter)
  ),
  inject: [TaskListAdapter],
}
