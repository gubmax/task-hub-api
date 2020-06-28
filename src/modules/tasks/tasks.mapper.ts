import { TaskListEntity } from 'domains/entities/task-list.entity'
import { TaskEntity } from 'domains/entities/task.entity'
import { TaskOrmEntity } from './task.orm-entity'

export class TasksMapper {
  static mapToDomain(taskList: TaskOrmEntity[]) {
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
