import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TodoItem} from "../../../classes/todo-item";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {TodoListItem} from "../../../classes/todo-list-item";

@Component({
  selector: 'app-todo-popup',
  templateUrl: './todo-popup.component.html',
  styleUrls: ['./todo-popup.component.scss']
})
export class TodoPopupComponent {

  todoForm: UntypedFormGroup;
  popupType = 'Create';

  get title(): UntypedFormControl {
    return this.todoForm.get('title') as UntypedFormControl
  }

  get description(): UntypedFormControl {
    return this.todoForm.get('description') as UntypedFormControl
  }

  constructor(private readonly dialogRef: MatDialogRef<TodoPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TodoItem | TodoListItem,
              private readonly fb: UntypedFormBuilder) {
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
