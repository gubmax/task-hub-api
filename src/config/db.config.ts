import { join } from 'path'

export default {
  type: 'sqlite',
  database: join(__dirname, '..', 'db', 'task-hub.db'),
  autoLoadEntities: true,
}
