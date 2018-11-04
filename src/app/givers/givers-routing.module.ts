import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiversRootComponent } from './components/givers-root/givers-root.component';

const routes: Routes = [
  { path: '', component: GiversRootComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiversRoutingModule { }
