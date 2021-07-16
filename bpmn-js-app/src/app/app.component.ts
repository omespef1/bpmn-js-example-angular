import { Component, ViewChild, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { WorkflowService } from './services/workflow.service';
import { SessionService } from './services/session.service';
import { DxDropDownBoxComponent, DxSelectBoxComponent } from 'devextreme-angular';
import { ConfigService } from './services/config.service';
import { BehaviorSubject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import dxSelectBox from 'devextreme/ui/select_box';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  @ViewChild('dropDownBoxWorflowList', { static: false }) dropDownBoxWorflowList: DxSelectBoxComponent;
  title = 'bpmn-js-angular';
  diagramUrl = 'https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';
  importError?: Error;
  closeButtonOptions: any;
  openButtonOptions: any;
  popupVisible = false;
  workflowSelected: any = {};
  workflowList: any[]=[];
  workflowListData: BehaviorSubject<any[]> =  new BehaviorSubject<any[]>([]);
  isGridBoxOpened: boolean;
  gridDataSource: any;
  gridColumns: any = ['FLU_NOMB'];
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

        this.workflowListData.next(this.workflowList);
      }
    })

  }

  showModalWorkflowList() {
    this.popupVisible = true;
  }

  setFlowSelected(e) {
debugger;
    this.workflowSelected = e.data.value;
    this.dropDownBoxWorflowList.instance.close();
  }


}
