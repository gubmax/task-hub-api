import {
  Controller, Inject, Post, Body,
} from '@nestjs/common'

import { UserId } from 'domains/entities/user.entity'
import { GetTaskListQuery } from 'domains/ports/inbound/get-task-list.query'
import { TaskEntity } from 'domains/entities/task.entity'

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(GetTaskListQuery) private readonly _getTaskListService: GetTaskListQuery,
  ) {}

  @Post()
  async getTaskList(@Body() { userId }: { userId: UserId }): Promise<TaskEntity[]> {
    const taskList = await this._getTaskListService.getTaskList(userId)
    return taskList.tasks
  }

  // TODO: Add addTask and removeTask endpoints
}
