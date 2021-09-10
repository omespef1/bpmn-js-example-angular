import { BrowserModule } from '@angular/platform-browser';
import { DiagramComponent } from './pages/diagram/diagram.component';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DxDataGridModule, DxDropDownBoxModule, DxFormModule, DxPopupModule, DxSelectBoxModule, DxTabsModule, DxToolbarModule } from 'devextreme-angular';
import { AppRoutingModule } from './app.routing.module';
import { DxoPositionModule } from 'devextreme-angular/ui/nested';
import { AuthInterceptorService } from './interceptors/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent
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
    DxTabsModule
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
