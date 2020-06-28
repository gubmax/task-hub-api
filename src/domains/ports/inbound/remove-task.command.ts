import { UserId } from 'domains/entities/user.entity'
import { TaskId } from 'domains/entities/task.entity'

export class RemoveTaskCommand {
  constructor(
    private readonly _userId: UserId,
    private readonly _taskId: TaskId,
  ) {}

  get userId(): UserId {
    return this._userId
  }

  get taskId(): TaskId {
    return this._taskId
  }
}
