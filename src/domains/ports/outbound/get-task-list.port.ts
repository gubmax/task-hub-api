import { UserId } from 'domains/entities/user.entity'
import { TaskListEntity } from 'domains/entities/task-list.entity'

export interface GetTaskListPort {
  getTaskList(userId: UserId): Promise<TaskListEntity>
}
