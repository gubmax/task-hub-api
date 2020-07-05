import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

import {
  TaskId, TaskTimestamp, TaskTitle, TaskText,
} from 'domains/entities/task.entity'
import {
  taskIdApiProperty, taskTitleApiProperty, taskTimestampApiProperty, taskTextApiProperty,
} from './task-fields.api-property'

export class TaskApiDto {
  @ApiProperty(taskIdApiProperty)
  @IsNotEmpty()
  id: TaskId

  @ApiProperty(taskTitleApiProperty)
  @IsNotEmpty()
  title: TaskTitle

  @ApiProperty(taskTimestampApiProperty)
  @IsNotEmpty()
  timestamp: TaskTimestamp

  @ApiProperty(taskTextApiProperty)
  @IsNotEmpty()
  text: TaskText
}
