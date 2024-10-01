import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductsService } from '../../shared/services/products.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatSelectModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  productsService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product) {
    this.form = new FormGroup({
      image: new FormControl<string>(data.image, {
        nonNullable: true,
      }),
      title: new FormControl<string>(data.title, {
        nonNullable: true,
        validators: Validators.required,
      }),
      category: new FormControl<string>(data.category, {
        nonNullable: true,
        validators: Validators.required,
      }),
      amount: new FormControl<number>(data.amount, {
        nonNullable: true,
        validators: Validators.required,
      }),
      status: new FormControl<string>(data.status || "Não Comprado", {
        nonNullable: true,
      })
    });
  }

  onSubmit() {
    this.productsService.put(this.data.id, {
      image: this.form.controls['image'].value,
      title: this.form.controls['title'].value,
      category: this.form.controls['category'].value,
      amount: this.form.controls['amount'].value,
      status: this.form.controls['status'].value,
    })
    .subscribe(() => {
      this.matSnackBar.open('Produto editado com sucesso!', 'Ok', {
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
