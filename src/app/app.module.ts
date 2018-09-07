import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TaxpayComponent } from './pages/taxpay/taxpay.component';
import { GrowlModule } from 'primeng/growl';
import { MessageModule } from 'primeng/message';
import { TextboxComponent } from './pages/textbox/textbox.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import {TabMenuModule} from 'primeng/tabmenu';

const commonRoutes: Routes = [
  { path: '**', redirectTo: 'taxpay' }
];

@NgModule({
  declarations: [
    AppComponent,
    TaxpayComponent,
    TextboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    GrowlModule,
    MessageModule,
    TabMenuModule,
    RouterModule.forRoot(commonRoutes)
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
