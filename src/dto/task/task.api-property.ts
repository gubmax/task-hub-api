import { ApiPropertyOptions } from '@nestjs/swagger'
import { TaskApiDto } from './task.api-dto'

export const taskApiProperty: ApiPropertyOptions = {
  example: TaskApiDto,
  description: 'task',
}
