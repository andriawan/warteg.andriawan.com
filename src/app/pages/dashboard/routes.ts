import { Routes } from "@angular/router";
import { ItemsComponent } from "./master-data/items/items.component";
import { DashComponent } from "./master-data/dash/dash.component";

export default [
  {
      path     : '',
      component: DashComponent,
  },
  {
      path     : 'items',
      component: ItemsComponent,
  },
  { path: '**', redirectTo: '' },
] as Routes;