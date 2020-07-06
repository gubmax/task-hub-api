import { TaskId } from 'domains/entities/task.entity'

export class RemoveTaskCommand {
  constructor(
    private readonly _taskId: TaskId,
  ) {}

  get taskId(): TaskId {
    return this._taskId
  }
}
