import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CardBookComponent } from './views/home/components/card-book/card-book.component';
import { CoverBookComponent } from './shared/components/cover-book/cover-book.component';
import { HeaderComponent } from './views/home/components/header/header.component';
import { BookFormComponent } from './views/dialog/book-form/book-form.component';
import { InputFieldComponent } from './shared/components/input-field/input-field.component';
import { TextAreaFieldComponent } from './shared/components/text-area-field/text-area-field.component';
import { InputChipComponent } from './shared/components/input-chip/input-chip.component';
import { InputStarRantingComponent } from './shared/components/input-star-ranting/input-star-ranting.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InterceptorService } from './shared/components/loader/interceptor.service';
import { FooterComponent } from './views/home/components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardBookComponent,
    CoverBookComponent,
    HeaderComponent,
    BookFormComponent,
    InputFieldComponent,
    TextAreaFieldComponent,
    InputChipComponent,
    InputStarRantingComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
