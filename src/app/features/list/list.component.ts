import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CategoryCardsComponent } from './components/category-cards/category-cards.component';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EditComponent } from '../edit/edit.component';

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

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit() {
    const dialogRef = this.dialog.open(EditComponent);
  }


  openCreateProduct() {
    const dialogRef = this.dialog.open(CreateComponent);
  }
}
