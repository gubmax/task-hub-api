import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ConfigService } from '@nestjs/config'

import { AppModule } from 'app.module'

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule, new FastifyAdapter(),
  )
  const config = app.get(ConfigService)
  const port = config.get<number>('port')

  await app.listen(port!)
}

bootstrap()
