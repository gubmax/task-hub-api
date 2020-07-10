import { Exception } from './exception'

export class InternalServerException extends Exception {
  constructor(cause: string) {
    super(500, 'Внутренняя ошибка сервера', 'internal', cause)
  }
}
