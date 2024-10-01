import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CategoryCardsComponent } from './components/category-cards/category-cards.component';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EditComponent } from '../edit/edit.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template:
  `
    <h2 mat-dialog-title>Deletar produto</h2>
      <mat-dialog-content>
        Tem certeza que quer deletar este produto?
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button (click)="onNo()">Não</button>
        <button mat-raised-button color="accent" (click)="onYes()" cdkFocusInitial>Sim</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef);

  onNo() {
    this.matDialogRef.close(false);
  }

  onYes() {
    this.matDialogRef.close(true);
  }
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, CategoryCardsComponent, MatButtonModule, MatDialogModule, MatCardModule, MatIconModule, MatTableModule, MatChipsModule, MatSlideToggleModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products: Product[] = [];

  productsService = inject(ProductsService);

  readonly dialog = inject(MatDialog);

  router = inject(Router)

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  openCreateProduct() {
    const dialogRef = this.dialog.open(CreateComponent);
  }

  onEdit(product: Product) {
    const dialogRef = this.dialog.open(EditComponent, {
        data: product,
    });
  }

  onDelete(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent)
      .afterClosed()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        this.productsService.delete(product.id).subscribe(() => {
          this.productsService.getAll().subscribe((products) => {
            this.products = products;
          });
        });
      });
  }
}
