import { BrowserModule } from '@angular/platform-browser';
import { DiagramComponent } from './pages/diagram/diagram.component';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DxAccordionModule, DxButtonGroupModule, DxButtonModule, DxDataGridModule, DxDropDownBoxModule, DxFileUploaderModule, DxFormModule, DxLookupModule, DxPopupModule, DxScrollViewModule, DxSelectBoxModule, DxSpeedDialActionModule, DxTabsModule, DxTextBoxModule, DxToolbarModule, DxTreeListModule, DxTreeViewModule } from 'devextreme-angular';
import { AppRoutingModule } from './app.routing.module';
import { DxoPagerModule, DxoPagingModule, DxoPositionModule } from 'devextreme-angular/ui/nested';
import { AuthInterceptorService } from './interceptors/interceptor';
import { BrowserComponent } from './pages/browser/browser.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent,
    BrowserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DxToolbarModule,
    AppRoutingModule,
    DxPopupModule,
    DxoPositionModule,
    DxDropDownBoxModule,
    DxSelectBoxModule,
    DxFormModule,
    DxDataGridModule,
    DxTabsModule,
    DxScrollViewModule,
    DxLookupModule,
    DxTextBoxModule,
    DxFileUploaderModule,
    DxTreeListModule,
    DxTreeViewModule,
    DxButtonGroupModule,
    DxButtonModule,
    DxSpeedDialActionModule,
    DxAccordionModule,
    DxoPagerModule,DxoPagingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
