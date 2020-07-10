import { AsyncEither } from 'types/async-either'
import { AddTaskCommand } from './add-task.command'

export abstract class AddTaskUseCase {
  abstract addTask(command: AddTaskCommand): AsyncEither
}
