import {TodoListItem} from "../../classes/todo-list-item";

export interface TodoState {
  todoList: Array<TodoListItem>
}

export const initialState: TodoState = {
  todoList: []
};
