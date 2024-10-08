import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductsService } from '../../shared/services/products.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatSelectModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  productsService = inject(ProductsService);

  matSnackBar = inject(MatSnackBar)

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
      validators: [Validators.required, Validators.min(1)],
    }),
    status: new FormControl<string>("Não Comprado", {
      nonNullable: true,
    }),
  });

  onSubmit() {
    if (this.form.valid) {
      this.productsService.post({
        image: this.form.controls.image.value,
        title: this.form.controls.title.value,
        category: this.form.controls.category.value,
        amount: this.form.controls.amount.value,
        status: this.form.controls.status.value,
      }).subscribe(() => {
        this.matSnackBar.open('Produto criado com sucesso!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      });

      setTimeout(() => {
        window.location.reload();
      });
    }
  }
}
