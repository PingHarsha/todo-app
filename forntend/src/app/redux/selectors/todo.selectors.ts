import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TodoState} from "../states/todos.state";

export const todos = createFeatureSelector<TodoState>('todos')

export const getAllTodos = createSelector(todos, (state: TodoState) => state.todoList);
