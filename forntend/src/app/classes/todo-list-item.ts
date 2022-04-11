import {TodoItem} from "./todo-item";

export class TodoListItem extends TodoItem {
  updated_at: Date;
  id: number;
  created_at: Date;

  constructor(title: string, description: string, updated_at: Date, id: number, created_at: Date) {
    super(title, description);
    this.updated_at = updated_at;
    this.id = id;
    this.created_at = created_at;
  }
}
