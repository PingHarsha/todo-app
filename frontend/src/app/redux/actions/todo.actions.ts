import {createAction, props} from '@ngrx/store';
import {TodoItem} from "../../classes/todo-item";
import {TodoListItem} from "../../classes/todo-list-item";

//#region GET all to-dos
export const todoGetAll = createAction(
  '[Todo] Todo Get All'
);

export const todoUpdateAll = createAction(
  '[Todo] Todo Create',
  props<{ data: Array<TodoListItem> }>()
);

export const failedGetAllFetch = createAction(
  '[Todo] Todo Failed Get All',
  props<{ data: any }>()
);

//#endregion

//#region CREATE to-do
export const todoCreate = createAction(
  '[Todo] Todo Create todo',
  props<{ data: TodoItem }>()
);

export const todoAddItem = createAction(
  '[Todo] Todo Create Item',
  props<{ data: TodoListItem }>()
);

export const failedCreateTodo = createAction(
  '[Todo] Todo Failed To Create Todo',
  props<{ data: any }>()
);
//#endregion

//#region DELETE to-do

export const todoDeleteTodo = createAction(
  '[Todo] Todo Delete Todo',
  props<{ id: number }>()
);

export const todoDeleteItem = createAction(
  '[Todo] Todo Delete Item',
  props<{ id: number }>()
);

export const failedDeleteTodo = createAction(
  '[Todo] Todo Failed To Delete Todo',
  props<{ data: any }>()
);


//#endregion

//#region UPDATE to-do

export const todoUpdate = createAction(
  '[Todo] Todo Update',
  props<{ id: number, data: TodoItem }>()
)

export const failedUpdateTodo = createAction(
  '[Todo] Todo Failed To Update Todo',
  props<{ data: any }>()
);
//#endregion
