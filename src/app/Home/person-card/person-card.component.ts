import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent {
  @Output() saveChanges: EventEmitter<void> = new EventEmitter();
  @Output() cancelEdit: EventEmitter<void> = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private auth: AuthService, private dialogRef: MatDialogRef<PersonCardComponent>,) {

  }

  onSaveClick() {
    const id = this.data.id;
    const updatedPerson = this.data.editForm.value;

    this.auth.updatePerson(id, updatedPerson).subscribe(
      (response) => {
        console.log('Person updated successfully', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error updating person', error);
      }
    );
    this.auth.getPeople()
    this.onCancelClick()
  }

  onCancelClick(): void {
    this.dialogRef.close()
    this.cancelEdit.emit();
  }

}
