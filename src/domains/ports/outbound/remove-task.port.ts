import { TaskId } from 'domains/entities/task.entity'

export interface RemoveTaskPort {
  removeTask(taskId: TaskId): Promise<void>
}
