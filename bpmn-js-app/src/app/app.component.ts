import { Component, ViewChild, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { WorkflowService } from './services/workflow.service';
import { SessionService } from './services/session.service';
import { DxDropDownBoxComponent } from 'devextreme-angular';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  @ViewChild('dropDownBoxWorflowList', { static: false }) dropDownBoxWorflowList: DxDropDownBoxComponent;
  title = 'bpmn-js-angular';
  diagramUrl = 'assets/init.xml';
  importError?: Error;
  closeButtonOptions: any;
  openButtonOptions: any;
  popupVisible = false;
  workflowSelected: any = {};
  workflowList: any[]=[];
  items: any[] = [
    { location: 'before', widget: 'dxButton', options: { icon: 'plus', text: 'Nuevo' } },
    {
      location: 'before', widget: 'dxButton', options: {
        icon: 'folder', text: 'Abrir', onClick: () => {
          this.popupVisible = true;
        }
      }
    },
    { location: 'before', widget: 'dxButton', options: { icon: 'save', text: 'Guardar' } },
    { location: 'before', widget: 'dxButton', options: { icon: 'trash', text: 'Borrar' } },
    { location: 'before', widget: 'dxButton', options: { icon: 'fullscreen', text: 'Centrar' } },
    { location: 'before', widget: 'dxButton', options: { icon: 'remove', text: 'Cancelar' } }

  ];
  constructor(private WorkflowService: WorkflowService, private session: SessionService,private configService:ConfigService ){

  
    this.closeButtonOptions = {
      text: "Cerrar",
      icon:'remove',
      onClick: ()=>  {
          this.popupVisible = false;
      }
  };
  this.openButtonOptions = {
    text: "Abrir",
    icon:'folder',
    onClick: ()=> {
        this.popupVisible = false;
    }

};




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

    this.importError = error;
  }

  async ngOnInit(){
    await this.configService.getAppConfig();
    this.getWorkflowList();
  }

  getWorkflowList() {
    this.WorkflowService.GetWorkFlowByCompany("102").subscribe(resp => {
      if (resp.IsSuccessful) {
        debugger;
        this.workflowList = resp.Result;
      }
    })

  }

  showModalWorkflowList() {
    this.popupVisible = true;
  }

  onRowClick(e) {

    this.workflowSelected = e.data.value;
    this.dropDownBoxWorflowList.instance.close();
  }


}
