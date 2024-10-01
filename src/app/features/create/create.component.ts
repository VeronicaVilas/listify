import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  form = new FormGroup({
    image: new FormControl<string>("", {
      nonNullable: true,
    }),
    title: new FormControl<string>("", {
      nonNullable: true,
      validators: Validators.required,
    }),
    category: new FormControl<string>("", {
      nonNullable: true,
      validators: Validators.required,
    }),
    amount: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required,
    }),
    status: new FormControl<string>("Não Comprado", {
      nonNullable: true,
    })
  })

  onSubmit() {
    this.form.controls.image.value;
    this.form.controls.title.value;
    this.form.controls.category.value;
    this.form.controls.amount.value;
    this.form.controls.status.value;
  }
}
