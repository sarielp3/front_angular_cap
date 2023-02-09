import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './services/token.interceptor';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { VuelosModule } from './components/vuelos/vuelos.module';
import { GetHotelesComponent } from './components/get-hoteles/get-hoteles.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReservasComponent } from './components/reservas/reservas.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AltaReservaComponent } from './components/reservas/alta-reserva/alta-reserva.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { ModificaReservaComponent } from './components/reservas/modifica-reserva/modifica-reserva.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './shared/components/snack-bar/snack-bar.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CuartosComponent } from './components/cuarto/cuartos.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AltaHotelesComponent } from './components/get-hoteles/alta-hoteles/alta-hoteles.component';
import { ModificarHotelesComponent } from './components/get-hoteles/modificar-hoteles/modificar-hoteles.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RegistroCuartosComponent } from './components/cuarto/alta-cuartos/alta-cuartos.component';
import { ModificarCuartosComponent } from './components/cuarto/modificar-cuartos/modificar-cuartos.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    GetHotelesComponent,
    ReservasComponent,
    AltaReservaComponent,
    ConfirmDialogComponent,
    ModificaReservaComponent,
    SnackBarComponent,
    CuartosComponent,
    AltaHotelesComponent,
    ModificarHotelesComponent,
    RegistroCuartosComponent,
    ModificarCuartosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatGridListModule,
    VuelosModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatAutocompleteModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
