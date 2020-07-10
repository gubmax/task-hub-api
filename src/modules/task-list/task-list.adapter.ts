import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { GetTaskListPort } from 'domains/ports/outbound/get-task-list.port'
import { RemoveTaskPort } from 'domains/ports/outbound/remove-task.port'
import { UserId } from 'domains/entities/user.entity'
import { AddTaskPort } from 'domains/ports/outbound/add-task.port'
import { TaskEntity, TaskId } from 'domains/entities/task.entity'
import { TaskOrmDto } from 'dto/task/task.orm-dto'
import { TaskListMapper } from 'dto/task-list/task-list.mapper'
import { TaskMapper } from 'dto/task/task.mapper'
import { Either } from 'utils/either'
import { InternalServerException } from 'domains/exceptions/internal-server-exception'
import { AsyncEither } from 'types/async-either'

declare global {
  interface ProxyConstructor {
    new <T extends object>(
      target: T,
      handler: ProxyHandler<T>
    ): {[K in keyof T]: T[K] extends (...args: any) => Promise<infer R>
        ? (...args: any) => AsyncEither<R>
        : T[K]};
  }
}

@Injectable()
export class TaskListAdapter implements GetTaskListPort, AddTaskPort, RemoveTaskPort {
  constructor(
    @InjectRepository(TaskOrmDto)
      private readonly _taskRepository: Repository<TaskOrmDto>,
  ) {}

  private readonly repository = new Proxy(this._taskRepository, {
    get: (target, name, receiver) => (
      async (...args: TaskOrmDto[]) => {
        try {
          const data = await Reflect
            .get(target, name, receiver)
            .apply(target, args)

          return Either.right(data)
        } catch (ex) {
          return Either.left(Error(ex.message))
        }
      }
    ),
  })

  async getTaskList(userId: UserId): AsyncEither<TaskEntity[]> {
    const tasks = await this.repository.find({ userId })
    return tasks
      .mapLeft((ex) => new InternalServerException(ex.message))
      .mapRight((res) => TaskListMapper.mapOrmToDomain(res))
  }

  async addTask(userId: UserId, task: TaskEntity): AsyncEither {
    const newTask = TaskMapper.mapDomainToOrm(userId, task)
    const savedTask = await this.repository.save(newTask)
    return savedTask
      .mapLeft((ex) => new InternalServerException(ex.message))
      .mapRight(() => {})
  }

  async removeTask(taskId: TaskId): AsyncEither {
    const removedTask = await this.repository.delete({ taskId })
    return removedTask
      .mapLeft((ex) => new InternalServerException(ex.message))
      .mapRight(() => {})
  }
}
