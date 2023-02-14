import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { PropertyPreviewComponent } from './components/property-preview/property-preview.component';

const routes: Routes = [
  {
    path: 'property',
    component: PropertyListComponent
  },
  {
    path: 'property/new',
    component: PropertyFormComponent
  },
  {
    path: 'property/:id',
    component: PropertyPreviewComponent
  },
  {
    path: '',
    redirectTo:'/property',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
