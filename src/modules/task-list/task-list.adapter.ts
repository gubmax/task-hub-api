import { Injectable, Inject } from '@nestjs/common'
import { noop } from 'rxjs'

import { GetTaskListPort } from 'domains/ports/outbound/get-task-list.port'
import { RemoveTaskPort } from 'domains/ports/outbound/remove-task.port'
import { UserId } from 'domains/entities/user.entity'
import { AddTaskPort } from 'domains/ports/outbound/add-task.port'
import { TaskEntity, TaskId } from 'domains/entities/task.entity'
import { TaskOrmDto } from 'dto/task/task.orm-dto'
import { TaskListMapper } from 'dto/task-list/task-list.mapper'
import { TaskMapper } from 'dto/task/task.mapper'
import { InternalServerException } from 'domains/exceptions/internal-server-exception'
import { AsyncEither } from 'types/async-either'
import { TypeOrmProxySymbol } from 'modules/typeorm-proxy/typeorm-proxy.utils'
import { RepositoryProxy, TypeOrmProxy } from 'modules/typeorm-proxy/typeorm-proxy.types'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class TaskListAdapter implements GetTaskListPort, AddTaskPort, RemoveTaskPort {
  private readonly _taskRepositoryProxy: RepositoryProxy<TaskOrmDto>

  constructor(
    @InjectRepository(TaskOrmDto)
      private readonly _taskRepository: Repository<TaskOrmDto>,
    @Inject(TypeOrmProxySymbol)
      private readonly _repositoryProxy: TypeOrmProxy,
  ) {
    this._taskRepositoryProxy = this._repositoryProxy(this._taskRepository)
  }

  async getTaskList(userId: UserId): AsyncEither<TaskEntity[]> {
    const tasks = await this._taskRepositoryProxy.find({ userId })
    return tasks
      .mapLeft((ex) => new InternalServerException(ex.message))
      .mapRight((res) => TaskListMapper.mapOrmToDomain(res))
  }

  async addTask(userId: UserId, task: TaskEntity): AsyncEither {
    const newTask = TaskMapper.mapDomainToOrm(userId, task)
    const savedTask = await this._taskRepositoryProxy.save(newTask)
    return savedTask
      .mapLeft((ex) => new InternalServerException(ex.message))
      .mapRight(noop)
  }

  async removeTask(taskId: TaskId): AsyncEither {
    const removedTask = await this._taskRepositoryProxy.delete({ taskId })
    return removedTask
      .mapLeft((ex) => new InternalServerException(ex.message))
      .mapRight(noop)
  }
}
