import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsDefined, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

import { TaskId } from 'domains/entities/task.entity'
import { UserId } from 'domains/entities/user.entity'
import { TaskApiDto } from 'dto/task/task.api-dto'
import { userApiProperty } from 'dto/user/user.api-property'
import { taskIdApiProperty } from 'dto/task/task-fields.api-property'
import { taskApiProperty } from 'dto/task/task.api-property'

export class GetTaskListApiDto {
  @ApiProperty(userApiProperty)
  @IsNotEmpty()
  userId: UserId
}

export class AddTaskApiDto {
  @ApiProperty(userApiProperty)
  @IsNotEmpty()
  userId: string

  @ApiProperty(taskApiProperty)
  @IsDefined()
  @ValidateNested()
  @Type(() => TaskApiDto)
  task: TaskApiDto
}

export class RemoveTaskApiDto {
  @ApiProperty(taskIdApiProperty)
  @IsNotEmpty()
  taskId: TaskId
}
