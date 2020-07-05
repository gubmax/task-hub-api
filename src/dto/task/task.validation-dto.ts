import { IsNotEmpty } from 'class-validator'

import {
  TaskId, TaskTimestamp, TaskTitle, TaskText,
} from 'domains/entities/task.entity'

export class TaskValidationDto {
  @IsNotEmpty()
  id: TaskId

  @IsNotEmpty()
  title: TaskTitle

  @IsNotEmpty()
  timestamp: TaskTimestamp

  @IsNotEmpty()
  text: TaskText
}
