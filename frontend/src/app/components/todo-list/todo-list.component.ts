import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getAllTodos} from "../../redux/selectors/todo.selectors";
import {todoDeleteTodo, todoGetAll, todoUpdate} from "../../redux/actions/todo.actions";
import {Observable} from "rxjs";
import {TodoListItem} from "../../classes/todo-list-item";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationPopupComponent} from "../popups/confirmation-popup/confirmation-popup.component";
import {TodoPopupComponent} from "../popups/todo-popup/todo-popup.component";
import {TodoItem} from "../../classes/todo-item";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => active', [ // using status here for transition
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(1000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class TodoListComponent implements OnInit {
  todoList: Observable<Array<TodoListItem>> = this.store.select(getAllTodos);

  constructor(private readonly store: Store, private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    // Action to get all TodoItems
    this.store.dispatch(todoGetAll());
  }

  editTodo(todo: TodoListItem): void {
    const popup = this.dialog.open(TodoPopupComponent, {
      data: todo
    });
    popup.afterClosed().subscribe((data: TodoListItem) => {
      if (data) {
        this.store.dispatch(todoUpdate({data: new TodoItem(data.title, data.description), id: data.id}));
      }
    })
  }

  deleteTodo(id: number): void {
    const popup = this.dialog.open(ConfirmationPopupComponent);
    popup.afterClosed().subscribe((data: boolean) => {
      if (data) {
        this.store.dispatch(todoDeleteTodo({id}));
      }
    });
  }
}
