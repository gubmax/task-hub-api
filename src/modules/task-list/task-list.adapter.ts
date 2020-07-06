import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { GetTaskListPort } from 'domains/ports/outbound/get-task-list.port'
import { RemoveTaskPort } from 'domains/ports/outbound/remove-task.port'
import { UserId } from 'domains/entities/user.entity'
import { TaskListEntity } from 'domains/entities/task-list.entity'
import { AddTaskPort } from 'domains/ports/outbound/add-task.port'
import { TaskEntity, TaskId } from 'domains/entities/task.entity'
import { TaskOrmDto } from 'dto/task/task.orm-dto'
import { TaskListMapper } from 'dto/task-list/task-list.mapper'
import { TaskMapper } from 'dto/task/task.mapper'

@Injectable()
export class TaskListAdapter implements GetTaskListPort, AddTaskPort, RemoveTaskPort {
  constructor(
    @InjectRepository(TaskOrmDto)
      private readonly _taskRepository: Repository<TaskOrmDto>,
  ) {}

  async getTaskList(userId: UserId): Promise<TaskListEntity> {
    const tasks = await this._taskRepository.find({ userId })
    return TaskListMapper.mapOrmToDomain(tasks)
  }

  async addTask(userId: UserId, task: TaskEntity): Promise<void> {
    const newTask = TaskMapper.mapDomainToOrm(userId, task)
    this._taskRepository.save(newTask)
  }

  async removeTask(taskId: TaskId): Promise<void> {
    this._taskRepository.delete({ taskId })
  }
}
