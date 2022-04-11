import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TodoService} from "../../services/todo.service";
import * as TodoActions from '../actions/todo.actions';
import {catchError, exhaustMap, map, of, switchMap} from "rxjs";
import {TodoListItem} from "../../classes/todo-list-item";
import {HotToastService} from "@ngneat/hot-toast";


@Injectable()
export class TodoEffects {

  constructor(private actions$: Actions,
              private readonly todoService: TodoService,
              private readonly toast: HotToastService) {
  }


  fetchAllTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.todoGetAll.type),
      switchMap(() =>
        this.todoService.getAll().pipe(
          this.toast.observe(
            {
              loading: 'Fetching Todos...',
              success: (s: Array<TodoListItem>) => `Successfully fetched ${s.length} todos!`,
              error: (e) => `Something did not work, reason: ${e}`,
            }
          ),
          map((data: Array<TodoListItem>) => TodoActions.todoUpdateAll({data})),
          catchError(err => of(TodoActions.failedGetAllFetch({data: err})))
        )
      )
    ));

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.todoCreate.type),
      exhaustMap((action: any) =>
        this.todoService.createTodo(action.data).pipe(
          this.toast.observe(
            {
              loading: 'Saving...',
              success: (s: TodoListItem) => `Saved TODO: ${s.title}`,
              error: (e) => `Something did not work, reason: ${e}`,
            }
          ),
          map(data => TodoActions.todoAddItem({data})),
          catchError(err => of(TodoActions.failedCreateTodo({data: err})))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.todoDeleteTodo.type),
      exhaustMap((action: any) =>
        this.todoService.deleteTodoById(action.id).pipe(
          this.toast.observe(
            {
              loading: 'deleting...',
              success: () => `Successfully deleted!`,
              error: (e) => `Something did not work, reason: ${e}`,
            }
          ),
          map(() => TodoActions.todoDeleteItem({id: action.id})),
          catchError(err => of(TodoActions.failedDeleteTodo({data: err})))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.todoUpdate.type),
      exhaustMap((action: any) =>
        this.todoService.updateTodoById(action.id, action.data).pipe(
          this.toast.observe(
            {
              loading: 'updating...',
              success: () => `Successfully updated!`,
              error: (e) => `Something did not work, reason: ${e}`,
            }
          ),
          map((data: TodoListItem) => TodoActions.todoAddItem({data})),
          catchError(err => of(TodoActions.failedUpdateTodo({data: err})))
        )
      )
    )
  );
}
