import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { GetTaskListPort } from 'domains/ports/outbound/get-task-list.port'
import { UserId } from 'domains/entities/user.entity'
import { TaskOrmEntity } from 'modules/tasks/task.orm-entity'
import { TaskListEntity } from 'domains/entities/task-list.entity'
import { TasksMapper } from 'modules/tasks/tasks.mapper'

@Injectable()
export class TasksAdapterService implements GetTaskListPort {
  constructor(
    @InjectRepository(TaskOrmEntity)
      private readonly _taskRepository: Repository<TaskOrmEntity>,
  ) {}

  async getTaskList(userId: UserId): Promise<TaskListEntity> {
    const tasks = await this._taskRepository.find({ userId })
    return TasksMapper.mapToDomain(tasks)
  }
}
