import {
  Controller, Inject, Post, Body,
} from '@nestjs/common'

import { UserId } from 'domains/entities/user.entity'
import { GetTaskListQuery } from 'domains/ports/inbound/get-task-list.query'
import { TaskEntity, TaskId } from 'domains/entities/task.entity'
import { AddTaskUseCase } from 'domains/ports/inbound/add-task.use-case'
import { AddTaskCommand } from 'domains/ports/inbound/add-task.command'
import { RemoveTaskCommand } from 'domains/ports/inbound/remove-task.command'
import { RemoveTaskUseCase } from 'domains/ports/inbound/remove-task.use-case'

type GetTaskListBody = { userId: UserId }

type AddTaskBody = { userId: UserId, task: TaskEntity }

type RemoveTaskBody = { userId: UserId, taskId: TaskId }

@Controller('tasks')
export class TaskListController {
  constructor(
    @Inject(GetTaskListQuery) private readonly _getTaskListService: GetTaskListQuery,
    @Inject(AddTaskUseCase) private readonly _addTaskService: AddTaskUseCase,
    @Inject(RemoveTaskUseCase) private readonly _removeTaskService: RemoveTaskUseCase,
  ) {}

  @Post()
  async getTaskList(@Body() { userId }: GetTaskListBody): Promise<TaskEntity[]> {
    const taskList = await this._getTaskListService.getTaskList(userId)
    return taskList.tasks
  }

  @Post('add')
  addTask(@Body() { userId, task }: AddTaskBody): Promise<void> {
    const addTaskCommand = new AddTaskCommand(userId, task)
    return this._addTaskService.addTask(addTaskCommand)
  }

  @Post('remove')
  removeTask(@Body() { userId, taskId }: RemoveTaskBody): Promise<void> {
    const removeTaskCommand = new RemoveTaskCommand(userId, taskId)
    return this._removeTaskService.removeTask(removeTaskCommand)
  }
}
