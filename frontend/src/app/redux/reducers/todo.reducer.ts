import {Action, createReducer, on} from '@ngrx/store';
import {todoDeleteItem, todoAddItem, todoUpdateAll} from "../actions/todo.actions";
import {initialState, TodoState} from "../states/todos.state";
import {TodoListItem} from "../../classes/todo-list-item";

const TodoReducer = createReducer(
  initialState,
  on(todoUpdateAll,
    (state, {data}) => ({...state, todoList: data})),
  on(todoAddItem,
    (state, {data}) => {
      const list: TodoListItem[] = [...state.todoList];
      const existing = state.todoList.findIndex(a => a.id === data.id);
      if (existing > -1) {
        list[existing] = data;
      } else {
        list.push(data);
      }
      return {...state, todoList: list}
    }),
  on(todoDeleteItem,
    (state, {id}) => {
      const list: TodoListItem[] = [...state.todoList];
      const existing = state.todoList.findIndex(a => a.id === id);
      if (existing > -1) {
        list.splice(existing, 1)
      }
      return {...state, todoList: list}
    }
  )
);

export function reducer(state: TodoState | undefined, action: Action) {
  return TodoReducer(state, action);
}
