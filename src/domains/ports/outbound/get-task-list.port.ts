import { UserId } from 'domains/entities/user.entity'
import { TaskEntity } from 'domains/entities/task.entity'
import { AsyncEither } from 'types/async-either'

export interface GetTaskListPort {
  getTaskList(userId: UserId): AsyncEither<TaskEntity[]>
}
