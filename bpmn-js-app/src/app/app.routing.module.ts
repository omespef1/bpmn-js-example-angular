import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RedirectComponent } from './pages/redirect/redirect.component';
import { DiagramComponent } from './pages/diagram/diagram.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'workflow', component: AppComponent },
  { path: 'redirect', component: RedirectComponent },
  { path: '**', redirectTo: 'workflow' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
