import { Component, computed, input } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  product = input.required<Product>();

  productImage = computed(() => this.product().image);
  productTitle = computed(() => this.product().title);
  productCategory = computed(() => this.product().category);
  productAmount = computed(() => this.product().amount);
  productStatus = computed(() => this.product().status);
  productIcon = computed(() => this.product().icon);
}
