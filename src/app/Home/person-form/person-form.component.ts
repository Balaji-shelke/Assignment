import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent {
  @Output() cancelEdit: EventEmitter<void> = new EventEmitter();

  personForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private dialogRef: MatDialogRef<PersonFormComponent>,) {
    this.personForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      // avatar: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.personForm.valid) {
      const newPerson = this.personForm.value;
      this.auth.addPerson(newPerson).subscribe((d) => {
      })
      this.auth.getPeople()
      this.dialogRef.close()
      this.cancelEdit.emit();

      // Reset the form after submission
      this.personForm.reset();
    } else {
      // Mark all fields as touched to display validation errors
      this.personForm.markAllAsTouched();
    }
  }

  cancel() {
    this.dialogRef.close();
    this.cancelEdit.emit();
  }
  selectedAvatar: string | ArrayBuffer | null = null;
  avatarInvalid = false;
  avatarTouched = false;

  onAvatarSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedAvatar = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
