import { TaskListEntity } from 'domains/entities/task-list.entity'
import { TaskEntity } from 'domains/entities/task.entity'
import { TaskOrmDto } from 'dto/task/task.orm-dto'

export class TaskListMapper {
  static mapOrmToDomain(taskList: TaskOrmDto[]): TaskListEntity {
    const taskListEntity = new TaskListEntity()

    taskList.forEach(({
      taskId, title, timestamp, text,
    }) => {
      const date = new Date(timestamp)
      const taskEntity = new TaskEntity(taskId, title, date, text)
      taskListEntity.add(taskEntity)
    })

    return taskListEntity
  }
}
