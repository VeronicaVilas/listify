import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductsService } from '../../shared/services/products.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatSelectModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  productsService = inject(ProductsService);

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
    }),
    icon: new FormControl<string>("❓", {
      nonNullable: true,
    }),
  })

  onSubmit() {
    this.productsService. post({
      image: this.form.controls.image.value,
      title: this.form.controls.title.value,
      category: this.form.controls.category.value,
      amount: this.form.controls.amount.value,
      status: this.form.controls.status.value,
      icon: this.form.controls.icon.value,
    })
    .subscribe(() => {
      alert('Sucesso!');
    });
  }
}
