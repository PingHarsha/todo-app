import {TodoState} from "./states/todos.state";
import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import * as TodoReducer from "./reducers/todo.reducer";

export interface State {
  todos: TodoState;
}
export const reducers: ActionReducerMap<State> = {
  todos: TodoReducer.reducer,
};
export const metaReducers: MetaReducer<State>[] = [];
