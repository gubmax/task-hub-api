import { UserId } from 'domains/entities/user.entity'
import { TaskEntity } from 'domains/entities/task.entity'
import { AsyncEither } from 'types/async-either'

export interface AddTaskPort {
  addTask(userId: UserId, task: TaskEntity): AsyncEither
}
