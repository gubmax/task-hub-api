import { TaskId } from 'domains/entities/task.entity'
import { AsyncEither } from 'types/async-either'

export interface RemoveTaskPort {
  removeTask(taskId: TaskId): AsyncEither
}
