import { UserId } from 'domains/entities/user.entity'
import { TaskEntity } from 'domains/entities/task.entity'

export class AddTaskCommand {
  constructor(
    private readonly _userId: UserId,
    private readonly _task: TaskEntity,
  ) {}

  get userId(): UserId {
    return this._userId
  }

  get task(): TaskEntity {
    return this._task
  }
}
