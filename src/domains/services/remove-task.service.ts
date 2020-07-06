import { RemoveTaskUseCase } from 'domains/ports/inbound/remove-task.use-case'
import { RemoveTaskPort } from 'domains/ports/outbound/remove-task.port'
import { RemoveTaskCommand } from 'domains/ports/inbound/remove-task.command'

export class RemoveTaskService implements RemoveTaskUseCase {
  constructor(
    private readonly _removeTaskPort: RemoveTaskPort,
  ) {}

  async removeTask(command: RemoveTaskCommand) {
    this._removeTaskPort.removeTask(command.taskId)
  }
}
