import { AsyncEither } from 'types/async-either'
import { Repository, ObjectLiteral } from 'typeorm'

type MapRepository<T extends Repository<any>> = {
  [K in keyof T]: T[K] extends (...args: infer A) => Promise<infer R>
    ? (...args: A) => AsyncEither<R>
    : T[K]
}

declare global {
  interface ProxyConstructor {
    new <T extends Repository<any>>(
      target: T,
      handler: ProxyHandler<T>
    ): MapRepository<T>;
  }
}

export type RepositoryProxy<T extends ObjectLiteral> = MapRepository<Repository<T>>

export type TypeOrmProxy = <T extends ObjectLiteral>(
  repository: Repository<T>,
) => RepositoryProxy<T>
