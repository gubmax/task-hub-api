import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core'
import { Exception } from 'domains/exceptions/exception'
import { LoggerService } from 'modules/logger/logger.service'

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    private adapterHost: HttpAdapterHost,
    private logger: LoggerService,
  ) {
    super()
  }

  catch(exception: Exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    const status = exception instanceof Exception
      ? exception.status
      : HttpStatus.INTERNAL_SERVER_ERROR

    this.logger.error(exception)
    response.status(status).send(JSON.stringify(exception))
  }
}
