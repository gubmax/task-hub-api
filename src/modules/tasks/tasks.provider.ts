import { GetTaskListService } from 'domains/services/get-task-list.service'
import { GetTaskListQuery } from 'domains/ports/inbound/get-task-list.query'
import { TasksAdapterService } from './tasks.adapter'

export const getTasksListProvider = {
  provide: GetTaskListQuery,
  useFactory: (taskAdapterService: TasksAdapterService) => (
    new GetTaskListService(taskAdapterService)
  ),
  inject: [TasksAdapterService],
}
