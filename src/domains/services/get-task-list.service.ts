import { GetTaskListPort } from 'domains/ports/outbound/get-task-list.port'
import { UserId } from 'domains/entities/user.entity'

export class GetTaskListService implements GetTaskListPort {
  constructor(
    private readonly _getTaskListPort: GetTaskListPort,
  ) {}

  getTaskList(userId: UserId) {
    return this._getTaskListPort.getTaskList(userId)
  }
}
