import { IsNotEmpty, IsDefined, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

import { TaskId } from 'domains/entities/task.entity'
import { UserId } from 'domains/entities/user.entity'
import { TaskValidationDto } from 'dto/task/task.validation-dto'

export class GetTaskListValidationDto {
  @IsNotEmpty()
  userId: UserId
}

export class AddTaskValidationDto {
  @IsNotEmpty()
  userId: string

  @IsDefined()
  @ValidateNested()
  @Type(() => TaskValidationDto)
  task: TaskValidationDto
}

export class RemoveTaskValidationDto {
  @IsNotEmpty()
  userId: UserId

  @IsNotEmpty()
  taskId: TaskId
}
