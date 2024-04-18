import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Person } from '../person';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PersonCardComponent } from './Home/person-card/person-card.component';
import { PersonFormComponent } from './Home/person-form/person-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() person: any | undefined;
  people: any

  searchTerm: string = '';
  editMode: boolean = false;
  editedPersonIndex: number = -1;
  editForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, public dialog: MatDialog) {
    this.auth.getPeople().subscribe((data) => {
      this.people = data
    })

    this.editForm = this.fb.group({
      name: [''],
      email: [''],
      dateOfBirth: [''],
      country: ['']
    });
  }
  // Create Person Functionlity
  openPersonCard(): void {
    const dialogRef = this.dialog.open(PersonFormComponent, {
      width: '700px',
      height: '500px',

    });

    dialogRef.afterClosed().subscribe(result => {
      this.auth.getPeople().subscribe((data) => {
        this.people = data
      })
      dialogRef.componentInstance.cancelEdit.subscribe(() => {
        dialogRef.close();
      });
    });


  }
//Edit Person Functionlity
  editPerson(index: number) {
    this.editMode = true;
    this.editedPersonIndex = index;
    const editedPerson = this.people[index];
    this.editForm.setValue({
      name: editedPerson.name,
      email: editedPerson.email,
      country: editedPerson.country,
      dateOfBirth: editedPerson?.dateOfBirth
    });
    const dialogRef = this.dialog.open(PersonCardComponent, {
      width: '700px',
      height: '500px',
      data: {
        id: editedPerson.id,
        editMode: true,
        editForm: this.editForm
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.auth.getPeople().subscribe((data) => {
        this.people = data
      })
      dialogRef.componentInstance.cancelEdit.subscribe(() => {
        dialogRef.close(); // Close the dialog when cancel button is clicked
      });
    });

  }

  saveChanges() {
    const editedPerson = this.editForm.value;
    this.people[this.editedPersonIndex] = editedPerson;
    this.cancelEdit();
  }

  cancelEdit() {
    this.editMode = false;
    this.editedPersonIndex = -1;
    this.editForm.reset();
  }
  //Delete Person Functionlity
  DeletePerson(index: number) {
    const editedPerson = this.people[index];
    this.auth.deletePerson(editedPerson.id).subscribe()
    this.auth.getPeople().subscribe((data) => {
      this.people = data
    })

  }
}
