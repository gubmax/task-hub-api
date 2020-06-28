export type TaskId = string
export type TaskName = string
export type TaskTimestamp = Date
export type TaskText = string

export class TaskEntity {
  constructor(
    private readonly _id: TaskId,
    private readonly _title: TaskName,
    private readonly _timestamp: TaskTimestamp,
    private readonly _text: TaskText,
  ) {}

  get id(): TaskId {
    return this._id
  }

  get title(): TaskName {
    return this._title
  }

  get timestamp(): TaskTimestamp {
    return this._timestamp
  }

  get text(): TaskText {
    return this._text
  }

  toJSON() {
    const {
      id, title, timestamp, text,
    } = this
    return {
      id, title, timestamp, text,
    }
  }
}
