import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TaxpayComponent } from './pages/taxpay/taxpay.component';
import { GrowlModule } from 'primeng/growl';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/components/common/messageservice';
import { TextboxComponent } from './pages/textbox/textbox.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import {TabMenuModule} from 'primeng/tabmenu';
import { HttpClientModule } from '@angular/common/http';
import  {Http} from '@angular/http';

import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { BlockUIModule } from 'primeng/blockui';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import {StepsModule} from 'primeng/steps';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';
import {ListboxModule} from 'primeng/listbox'

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
    HttpClientModule,
    FormsModule,
    CardModule,
    BrowserAnimationsModule,
    GrowlModule,
    MessageModule,
    TabMenuModule,
    SidebarModule,
    BlockUIModule,
    TooltipModule,
    FieldsetModule,
    FileUploadModule,
    CalendarModule,
    CheckboxModule,
    DialogModule,
    ConfirmDialogModule,
    TableModule,
    StepsModule,
    PanelModule,
    RadioButtonModule,
    DropdownModule,
    AutoCompleteModule,
    TabViewModule,
    ChartModule,
    ListboxModule,
    RouterModule.forRoot(commonRoutes)
  ],
  providers: [ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
