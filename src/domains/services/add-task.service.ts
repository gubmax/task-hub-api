import { AddTaskUseCase } from 'domains/ports/inbound/add-task.use-case'
import { AddTaskPort } from 'domains/ports/outbound/add-task.port'
import { AddTaskCommand } from 'domains/ports/inbound/add-task.command'

export class AddTaskService implements AddTaskUseCase {
  constructor(
    private readonly _addTaskPort: AddTaskPort,
  ) {}

  async addTask(command: AddTaskCommand) {
    const { userId, task } = command
    this._addTaskPort.addTask(userId, task)
  }
}
