import {
  Controller, Inject, Post, Body, Get, Param, Delete,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { GetTaskListQuery } from 'domains/ports/inbound/get-task-list.query'
import { TaskEntity } from 'domains/entities/task.entity'
import { AddTaskUseCase } from 'domains/ports/inbound/add-task.use-case'
import { AddTaskCommand } from 'domains/ports/inbound/add-task.command'
import { RemoveTaskCommand } from 'domains/ports/inbound/remove-task.command'
import { RemoveTaskUseCase } from 'domains/ports/inbound/remove-task.use-case'
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
  async getTaskList(@Param() { userId }: GetTaskListApiDto): Promise<TaskEntity[]> {
    const taskList = await this._getTaskListService.getTaskList(userId)
    return taskList.tasks
  }

  @ApiOperation({ summary: 'Add task to user' })
  @Post()
  addTask(@Body() { userId, task }: AddTaskApiDto): Promise<void> {
    const taskEntity = TaskMapper.mapApiToDomain(task)
    const addTaskCommand = new AddTaskCommand(userId, taskEntity)
    return this._addTaskService.addTask(addTaskCommand)
  }

  @ApiOperation({ summary: 'Remove user task' })
  @Delete(':taskId')
  removeTask(@Param() { taskId }: RemoveTaskApiDto): Promise<void> {
    const removeTaskCommand = new RemoveTaskCommand(taskId)
    return this._removeTaskService.removeTask(removeTaskCommand)
  }
}
