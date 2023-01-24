import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthenticationGuard } from './services/authentication-guard';
import { BuscarVuelosComponent } from './components/vuelos/pages/buscar-vuelos/buscar-vuelos.component';
import {MenuComponent} from './components/menu/menu.component';
import {GetHotelesComponent} from './components/get-hoteles/get-hoteles.component'

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
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'ConsultarHoteles',
    component: GetHotelesComponent
  },

  // more routiings
  {
    path: 'vuelos',
    component:  BuscarVuelosComponent
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
    useHash: true,
    onSameUrlNavigation: 'reload'
});
