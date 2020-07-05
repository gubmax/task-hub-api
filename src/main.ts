import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ConfigService } from '@nestjs/config'

import { AppModule } from 'app.module'
import corsOptions from 'config/cors.config'
import { LoggerService } from 'modules/logger/logger.service'

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule, new FastifyAdapter(), { logger: false },
  )
  const config = app.get(ConfigService)
  const port = config.get<number>('port')!
  const logger = app.get(LoggerService)

  app.useLogger(logger)
  app.enableCors(corsOptions)
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(port)

  logger.log(`Server listening on port ${port}`)
}

bootstrap()
