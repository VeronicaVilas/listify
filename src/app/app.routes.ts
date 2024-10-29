import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { featuresGuard } from './guards/features.guard';
import { ListComponent } from './features/list/list.component';
import { CreateComponent } from './features/create/create.component';
import { inject } from '@angular/core';
import { ProductsService } from './shared/services/products.service';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    canActivate: [featuresGuard]
  },
  {
    path: 'create-product',
    loadComponent: () =>
      import('./features/create/create.component').then(
        (m) => m.CreateComponent
      ),
  },
  {
    path: 'edit-product/:id',
    resolve: {
      product: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const productsService = inject(ProductsService);

        productsService.get(route.paramMap.get('id') as string);
      }
    },
    loadComponent: () =>
      import('./features/edit/edit.component').then(
        (m) => m.EditComponent
      ),
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
