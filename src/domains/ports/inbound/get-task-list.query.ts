import { UserId } from 'domains/entities/user.entity'
import { TaskEntity } from 'domains/entities/task.entity'
import { AsyncEither } from 'types/async-either'

export abstract class GetTaskListQuery {
  abstract getTaskList(userId: UserId): AsyncEither<TaskEntity[]>
}
