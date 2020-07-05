import { ApiPropertyOptions } from '@nestjs/swagger'

export const taskIdApiProperty: ApiPropertyOptions = {
  example: 'n9c52jj6',
}

export const taskTitleApiProperty: ApiPropertyOptions = {
  example: 'Some title',
}

export const taskTimestampApiProperty: ApiPropertyOptions = {
  example: '1593963156556',
}

export const taskTextApiProperty: ApiPropertyOptions = {
  example: 'The quick brown fox jumps over the lazy dog',
}
