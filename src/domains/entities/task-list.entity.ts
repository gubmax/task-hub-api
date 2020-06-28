import { TaskEntity, TaskId } from './task.entity'

export type TaskListId = string

export class TaskListEntity {
  private _tasks: TaskEntity[] = [];

  get tasks(): TaskEntity[] {
    return this._tasks
  }

  public add(task: TaskEntity) {
    this.tasks.push(task)
    return this
  }

  public remove(id: TaskId) {
    this._tasks = this.tasks.filter((task) => task.id !== id)
    return this
  }

  toJSON() {
    const { tasks } = this
    return { tasks }
  }
}
