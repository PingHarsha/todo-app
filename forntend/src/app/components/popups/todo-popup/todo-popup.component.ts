import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TodoItem} from "../../../classes/todo-item";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TodoListItem} from "../../../classes/todo-list-item";

@Component({
  selector: 'app-todo-popup',
  templateUrl: './todo-popup.component.html',
  styleUrls: ['./todo-popup.component.scss']
})
export class TodoPopupComponent {

  todoForm: FormGroup;
  popupType = 'Create';

  get title(): FormControl {
    return this.todoForm.get('title') as FormControl
  }

  get description(): FormControl {
    return this.todoForm.get('description') as FormControl
  }

  constructor(private readonly dialogRef: MatDialogRef<TodoPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TodoItem | TodoListItem,
              private readonly fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.title.patchValue(this.data.title);
    this.description.patchValue(this.data.description);
    if ((<TodoListItem>this.data).created_at !== undefined) {
      this.popupType = 'Update';
    }
  }


  close = (): void => this.dialogRef.close();

  save(): void {
    const todo = {...this.data};
    todo.title = this.title.value;
    todo.description = this.description.value;
    this.dialogRef.close(todo);
  }
}
