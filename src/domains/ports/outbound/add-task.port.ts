import { UserId } from 'domains/entities/user.entity'
import { TaskEntity } from 'domains/entities/task.entity'

export interface AddTaskPort {
  addTask(userId: UserId, task: TaskEntity): Promise<void>
}
