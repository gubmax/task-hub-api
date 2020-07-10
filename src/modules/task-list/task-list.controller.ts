import {
  Controller, Inject, Post, Body, Get, Param, Delete,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { GetTaskListQuery } from 'domains/ports/inbound/get-task-list.query'
import { AddTaskUseCase } from 'domains/ports/inbound/add-task.use-case'
import { AddTaskCommand } from 'domains/ports/inbound/add-task.command'
import { RemoveTaskCommand } from 'domains/ports/inbound/remove-task.command'
import { RemoveTaskUseCase } from 'domains/ports/inbound/remove-task.use-case'
import { Exception } from 'domains/exceptions/exception'
import { TaskEntity } from 'domains/entities/task.entity'
import { TaskMapper } from 'dto/task/task.mapper'
import { TaskApiDto } from 'dto/task/task.api-dto'
import { GetTaskListApiDto, AddTaskApiDto, RemoveTaskApiDto } from './task-list.api-dto'

@ApiTags('tasks')
@Controller('tasks')
export class TaskListController {
  constructor(
    @Inject(GetTaskListQuery) private readonly _getTaskListService: GetTaskListQuery,
    @Inject(AddTaskUseCase) private readonly _addTaskService: AddTaskUseCase,
    @Inject(RemoveTaskUseCase) private readonly _removeTaskService: RemoveTaskUseCase,
  ) {}

  @ApiOperation({ summary: 'Get user task list' })
  @ApiResponse({
    status: 200,
    description: 'The found task list',
    type: [TaskApiDto],
  })
  @Get(':userId')
  async getTaskList(@Param() { userId }: GetTaskListApiDto): Promise<Exception | TaskEntity[]> {
    const taskList = await this._getTaskListService.getTaskList(userId)
    return taskList.value
  }

  @ApiOperation({ summary: 'Add task to user' })
  @Post()
  async addTask(@Body() { userId, task }: AddTaskApiDto): Promise<Exception | void> {
    const taskEntity = TaskMapper.mapApiToDomain(task)
    const addTaskCommand = new AddTaskCommand(userId, taskEntity)
    const newTask = await this._addTaskService.addTask(addTaskCommand)
    return newTask.value
  }

  @ApiOperation({ summary: 'Remove user task' })
  @Delete(':taskId')
  async removeTask(@Param() { taskId }: RemoveTaskApiDto): Promise<Exception | void> {
    const removeTaskCommand = new RemoveTaskCommand(taskId)
    const removeTask = await this._removeTaskService.removeTask(removeTaskCommand)
    return removeTask.value
  }
}
