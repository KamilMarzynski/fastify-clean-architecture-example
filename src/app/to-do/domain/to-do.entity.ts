import { type UserId } from '../../../_lib/_sharedKernel'
import { type Entity, type EntityId } from '../../../_lib/core'

export type ToDoId = EntityId<string>
export interface ToDoProps {
  readonly title: string
  readonly description: string
  readonly isCompleted: boolean
  readonly ownerId: UserId
}

export class ToDo implements Entity<ToDoId, ToDoProps> {
  constructor (readonly id: ToDoId, readonly props: ToDoProps) { }

  public static create (id: ToDoId, props: Omit<ToDoProps, 'isCompleted'>): ToDo {
    return new ToDo(id, { ...props, isCompleted: false })
  }

  public complete (): ToDo {
    return new ToDo(this.id, { ...this.props, isCompleted: true })
  }

  public update (title: string, description: string): ToDo {
    return new ToDo(this.id, { ...this.props, title, description })
  }
}
