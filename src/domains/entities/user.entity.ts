export type UserId = string
export type UserName = string

export class UserEntity {
  constructor(
    private readonly _id: UserId,
    private readonly _name: UserName,
  ) {}

  get id(): UserId {
    return this._id
  }

  get name(): UserName {
    return this._name
  }

  toJSON() {
    const { id, name } = this
    return { id, name }
  }
}
