import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ConfigService } from '@nestjs/config'

import { AppModule } from 'app.module'
import corsOptions from 'config/cors.config'

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule, new FastifyAdapter(),
  )
  const config = app.get(ConfigService)
  const port = config.get<number>('port')

  app.enableCors(corsOptions)

  await app.listen(port!)
}

bootstrap()
