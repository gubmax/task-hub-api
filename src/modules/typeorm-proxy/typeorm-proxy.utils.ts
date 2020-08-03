import { Either } from 'utils/either'
import { TypeOrmProxy } from './typeorm-proxy.types'

export const TypeOrmProxySymbol = Symbol('TypeOrmProxy')

export const typeOrmProxy: TypeOrmProxy = (repository) => new Proxy(
  repository, {
    get: (target, name, receiver) => (
      async (...args: any) => {
        try {
          const data = await Reflect
            .get(target, name, receiver)
            .apply(target, args)

          return Either.right(data)
        } catch (ex) {
          return Either.left(Error(ex.message))
        }
      }
    ),
  },
)
