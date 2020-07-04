import pino, { Logger, LoggerOptions } from 'pino'

import { LoggerService as NestLoggerService, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export class LoggerService implements NestLoggerService {
  protected readonly _logger: Logger

  constructor(
    @Inject(ConfigService) private readonly _configService: ConfigService,
  ) {
    const prettyPrint: LoggerOptions['prettyPrint'] = this._configService.get<string>('env') === 'development'
      && {
        colorize: true,
        translateTime: 'yyyy-mm-dd HH:MM:ss.l',
      }

    this._logger = pino({ prettyPrint })
  }

  log(message: string) {
    this._logger.info(message)
  }

  error(error: Error) {
    this._logger.error(error)
  }

  warn(message: string) {
    this._logger.warn(message)
  }

  debug(message: string) {
    this._logger.debug(message)
  }
}
