import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('Task')
export class TaskOrmDto {
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
