import { BrowserModule } from '@angular/platform-browser';
import { DiagramComponent } from './pages/diagram/diagram.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DxDataGridModule, DxDropDownBoxModule, DxFormModule, DxPopupModule, DxSelectBoxModule, DxTabsModule, DxToolbarModule } from 'devextreme-angular';
import { AppRoutingModule } from './app.routing.module';
import { DxoPositionModule } from 'devextreme-angular/ui/nested';

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
  bootstrap: [AppComponent]
})
export class AppModule { }
