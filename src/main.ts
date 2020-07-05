import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from 'app.module'
import corsOptions from 'config/cors.config'
import swaggerOptions from 'config/swagger.config'
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

  const options = new DocumentBuilder()
    .setTitle(swaggerOptions.title)
    .setVersion(swaggerOptions.version)
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(port)

  logger.log(`Server listening on port ${port}`)
}

bootstrap()
