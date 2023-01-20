import { Routes, RouterModule } from '@angular/router';
import { CuartosComponent } from './components/cuarto/cuartos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthenticationGuard } from './services/authentication-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'habitaciones',
    component: CuartosComponent,
   
  },

  // more routiings
  { path: '**', component: NotFoundComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
    useHash: true,
    onSameUrlNavigation: 'reload'
});
