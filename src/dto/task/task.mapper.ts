import { TaskEntity } from 'domains/entities/task.entity'
import { UserId } from 'domains/entities/user.entity'
import { TaskApiDto } from './task.api-dto'
import { TaskOrmDto } from './task.orm-dto'

export class TaskMapper {
  static mapApiToDomain(task: TaskApiDto): TaskEntity {
    const {
      id, title, timestamp, text,
    } = task
    return new TaskEntity(id, title, timestamp, text)
  }

  static mapDomainToOrm(userId: UserId, task: TaskEntity): TaskOrmDto {
    const { id, ...rest } = task.toJSON()
    const newTask = new TaskOrmDto()
    return Object.assign(newTask, { userId, taskId: id, ...rest })
  }
}
