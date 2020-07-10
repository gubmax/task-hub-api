import { TaskEntity } from 'domains/entities/task.entity'
import { TaskOrmDto } from 'dto/task/task.orm-dto'

export class TaskListMapper {
  static mapOrmToDomain(taskList: TaskOrmDto[]): TaskEntity[] {
    const taskListEntity: TaskEntity[] = []

    taskList.forEach(({
      taskId, title, timestamp, text,
    }) => {
      const date = new Date(timestamp)
      const taskEntity = new TaskEntity(taskId, title, date, text)
      taskListEntity.push(taskEntity)
    })

    return taskListEntity
  }
}
