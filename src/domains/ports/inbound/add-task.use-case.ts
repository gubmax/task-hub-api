import { AddTaskCommand } from './add-task.command'

export abstract class AddTaskUseCase {
  abstract addTask(command: AddTaskCommand): Promise<void>
}
