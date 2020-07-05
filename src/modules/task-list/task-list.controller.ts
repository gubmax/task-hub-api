import {
  Controller, Inject, Post, Body,
} from '@nestjs/common'

import { GetTaskListQuery } from 'domains/ports/inbound/get-task-list.query'
import { TaskEntity } from 'domains/entities/task.entity'
import { AddTaskUseCase } from 'domains/ports/inbound/add-task.use-case'
import { AddTaskCommand } from 'domains/ports/inbound/add-task.command'
import { RemoveTaskCommand } from 'domains/ports/inbound/remove-task.command'
import { RemoveTaskUseCase } from 'domains/ports/inbound/remove-task.use-case'
import { TaskMapper } from 'dto/task/task.mapper'
import { GetTaskListValidationDto, AddTaskValidationDto, RemoveTaskValidationDto } from './task-list.validation-dto'

@Controller('tasks')
export class TaskListController {
  constructor(
    @Inject(GetTaskListQuery) private readonly _getTaskListService: GetTaskListQuery,
    @Inject(AddTaskUseCase) private readonly _addTaskService: AddTaskUseCase,
    @Inject(RemoveTaskUseCase) private readonly _removeTaskService: RemoveTaskUseCase,
  ) {}

  @Post()
  async getTaskList(@Body() { userId }: GetTaskListValidationDto): Promise<TaskEntity[]> {
    const taskList = await this._getTaskListService.getTaskList(userId)
    return taskList.tasks
  }

  @Post('add')
  addTask(@Body() { userId, task }: AddTaskValidationDto): Promise<void> {
    const taskEntity = TaskMapper.mapValidationToDomain(task)
    const addTaskCommand = new AddTaskCommand(userId, taskEntity)
    return this._addTaskService.addTask(addTaskCommand)
  }

  @Post('remove')
  removeTask(@Body() { userId, taskId }: RemoveTaskValidationDto): Promise<void> {
    const removeTaskCommand = new RemoveTaskCommand(userId, taskId)
    return this._removeTaskService.removeTask(removeTaskCommand)
  }
}
