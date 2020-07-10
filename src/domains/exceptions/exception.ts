export class Exception extends Error {
  private readonly _status: number
  private readonly _description: string
  private readonly _errorCode: string
  private readonly _cause: string

  constructor(
    status: number,
    description: string,
    errorCode: string,
    cause: string,
  ) {
    super()
    this._status = status
    this._description = description
    this._errorCode = errorCode
    this._cause = cause
  }

  get status(): number {
    return this._status
  }

  get description(): string {
    return this._description
  }

  get errorCode(): string {
    return this._errorCode
  }

  get cause(): string {
    return this._cause
  }

  toJSON() {
    const {
      status, description, errorCode, cause,
    } = this
    return {
      status, description, errorCode, cause,
    }
  }
}
