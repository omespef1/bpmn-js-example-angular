import { Component, ViewChild, OnInit } from '@angular/core';
import { ConfigService } from './services/config.service';
// import notify from 'devextreme/ui/notify';
// import { WorkflowService } from './services/workflow.service';
// import { SessionService } from './services/session.service';
// import { DxDropDownBoxComponent, DxSelectBoxComponent } from 'devextreme-angular';
// import { ConfigService } from './services/config.service';
// import { BehaviorSubject } from 'rxjs';
// import { Stage } from './models/bpm/Wf_Etapa';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {


  constructor(private configService:ConfigService){

  }
  handleImported(event) {

    const {
      type,
      error,
      warnings
    } = event;

    if (type === 'success') {
      console.log(`Rendered diagram (%s warnings)`, warnings.length);
    }

    if (type === 'error') {
      console.error('Failed to render diagram', error);
    }

    // this.importError = error;
  }

  async ngOnInit(){
    await this.configService.getAppConfig();
  }




}
