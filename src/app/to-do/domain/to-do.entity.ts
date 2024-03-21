import { type Entity, type EntityId } from '../../../_lib/core'

export type ToDoId = EntityId<string>
export interface ToDoProps {
  readonly title: string
  readonly description: string
  readonly isCompleted: boolean
}

export class ToDo implements Entity<ToDoId, ToDoProps> {
  constructor (readonly id: ToDoId, readonly props: ToDoProps) { }

  public complete (): ToDo {
    return new ToDo(this.id, { ...this.props, isCompleted: true })
  }

  public update (title: string, description: string): ToDo {
    return new ToDo(this.id, { ...this.props, title, description })
  }
}
