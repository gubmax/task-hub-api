import { RemoveTaskCommand } from './remove-task.command'

export abstract class RemoveTaskUseCase {
  abstract removeTask(command: RemoveTaskCommand): Promise<void>
}
