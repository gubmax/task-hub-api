import { UserId } from 'domains/entities/user.entity'
import { TaskListEntity } from 'domains/entities/task-list.entity'

export abstract class GetTaskListQuery {
  abstract getTaskList(userId: UserId): Promise<TaskListEntity>
}
