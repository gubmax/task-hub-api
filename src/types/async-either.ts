import { Either } from 'utils/either'
import { Exception } from 'domains/exceptions/exception'

export type AsyncEither<T = void> = Promise<Either<Exception, T>>
