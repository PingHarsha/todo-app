import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent {

  constructor(private readonly dialogRef: MatDialogRef<ConfirmationPopupComponent>) {
  }

  deleteTodo = (): void => this.dialogRef.close(true);
}
