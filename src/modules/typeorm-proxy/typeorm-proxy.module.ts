import { Module, ValueProvider } from '@nestjs/common'

import { typeOrmProxy, TypeOrmProxySymbol } from './typeorm-proxy.utils'
import { TypeOrmProxy } from './typeorm-proxy.types'

const typeOrmProxyValueProvider: ValueProvider<TypeOrmProxy> = {
  provide: TypeOrmProxySymbol,
  useValue: typeOrmProxy,
}

@Module({
  providers: [typeOrmProxyValueProvider],
  exports: [typeOrmProxyValueProvider],
})
export class TypeOrmProxyModule {}
