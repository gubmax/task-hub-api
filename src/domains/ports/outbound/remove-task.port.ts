import { UserId } from 'domains/entities/user.entity'
import { TaskId } from 'domains/entities/task.entity'

export interface RemoveTaskPort {
  removeTask(userId: UserId, taskId: TaskId): Promise<void>
}
