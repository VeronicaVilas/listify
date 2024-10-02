import { Component, inject, model} from '@angular/core';
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
import { filter } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { NoItemsComponent } from './components/no-items/no-items.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, CategoryCardsComponent, NoItemsComponent, MatButtonModule, MatDialogModule, MatCardModule, MatIconModule, MatTableModule, MatChipsModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, FormsModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products: Product[] = [];
  productsService = inject(ProductsService);
  readonly dialog = inject(MatDialog);
  confirmationDialogService = inject(ConfirmationDialogService);
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  router = inject(Router)

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
      this.showAllProducts();
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
    this.confirmationDialogService
    .openDialog()
    .pipe(filter((answer) => answer === true))
    .subscribe(() => {
      this.productsService.delete(product.id)
        .subscribe(() => {
          this.productsService.getAll().subscribe((products) => {
            this.products = products;
          });
        });
        setTimeout(() => {
          window.location.reload();
        });
    });
  }

  toggleDisable(product: Product): void {
    product.disabled = !product.disabled;
  }

  toggleStatus(product: Product): void {
    if (product.status === 'não comprado') {
      product.status = 'comprado';
    }
  }

  showAllProducts() {
    this.filteredProducts = this.products;
  }

  filterPurchased() {
    this.filteredProducts = this.products.filter(product => product.disabled);
  }

  filterNotPurchased() {
    this.filteredProducts = this.products.filter(product => !product.disabled);
  }

  searchProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
