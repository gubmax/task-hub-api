import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { GetTaskListPort } from 'domains/ports/outbound/get-task-list.port'
import { RemoveTaskPort } from 'domains/ports/outbound/remove-task.port'
import { UserId } from 'domains/entities/user.entity'
import { TaskListEntity } from 'domains/entities/task-list.entity'
import { AddTaskPort } from 'domains/ports/outbound/add-task.port'
import { TaskEntity, TaskId } from 'domains/entities/task.entity'
import { TaskOrmEntity } from './task.orm-entity'
import { TaskListMapper } from './task-list.mapper'

@Injectable()
export class TaskListAdapter implements GetTaskListPort, AddTaskPort, RemoveTaskPort {
  constructor(
    @InjectRepository(TaskOrmEntity)
      private readonly _taskRepository: Repository<TaskOrmEntity>,
  ) {}

  async getTaskList(userId: UserId): Promise<TaskListEntity> {
    const tasks = await this._taskRepository.find({ userId })
    return TaskListMapper.mapToDomain(tasks)
  }

  async addTask(userId: UserId, task: TaskEntity): Promise<void> {
    const newTask = new TaskOrmEntity()
    Object.assign(newTask, { userId, ...task })
    this._taskRepository.save(newTask)
  }

  async removeTask(userId: UserId, taskId: TaskId): Promise<void> {
    this._taskRepository.delete({ userId, taskId })
  }
}
