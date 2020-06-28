import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('Task')
export class TaskOrmEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  taskId: string

  @Column()
  userId: string

  @Column()
  title: string

  @Column()
  timestamp: number

  @Column()
  text: string
}
