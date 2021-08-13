import { Component, ViewChild, OnInit } from '@angular/core';
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
//   stagePropesrtiesItems:Stage= new Stage();
//   @ViewChild('dropDownBoxWorflowList', { static: false }) dropDownBoxWorflowList: DxSelectBoxComponent;
//   title = 'bpmn-js-angular';
//   diagramUrl =  'assets/init.xml';
//   importError?: Error;
//   closeButtonOptions: any;
//   openButtonOptions: any;
//   closeStageFlowButton: any;
//   setStageFlowButton: any;
//   flowListpopupVisible = false;
//   flowStagePropertiesVisible= false;
//   workflowSelected: any = {};
//   workflowList: any[]=[];
//   workflowListData: BehaviorSubject<any[]> =  new BehaviorSubject<any[]>([]);
//   isGridBoxOpened: boolean;
//   gridDataSource: any;
//   gridColumns: any = ['FLU_NOMB'];
//   priorityItems = [ { text:'Alta', id:'A' } , { text:'Media', id:'M'}, {text:'Baja',id:'B'} ];
//   calcItems = [ {text:'Generación etapa', id:'G'}, { text:'Final Calendario', id:'C'} ]
//   calendarItems =[ { text:'Normal', id:'J'}, {text:'De días hábiles', id:'H'} ]
//   items: any[] = [
//     { location: 'before', widget: 'dxButton', options: { icon: 'plus', text: 'Nuevo' } },
//     {
//       location: 'before', widget: 'dxButton', options: {
//         icon: 'folder', text: 'Abrir', onClick: () => {
//           this.flowListpopupVisible = true;
//         }
//       }
//     },
//     {
//       location: 'before', widget: 'dxButton', options: {
//         icon: 'folder', text: 'Propiedades Etapa', onClick: () => {
//           this.flowStagePropertiesVisible = true;
//         }
//       }
//     },
//     { location: 'before', widget: 'dxButton', options: { icon: 'save', text: 'Guardar' } },
//     { location: 'before', widget: 'dxButton', options: { icon: 'trash', text: 'Borrar' } },
//     { location: 'before', widget: 'dxButton', options: { icon: 'fullscreen', text: 'Centrar' } },
//     { location: 'before', widget: 'dxButton', options: { icon: 'remove', text: 'Cancelar' } }

//   ];




  
//   constructor(){
//     this.closeButtonOptions = {
//       text: "Cerrar",
//       icon:'remove',
//       onClick: ()=>  {
//           this.flowListpopupVisible = false;
//       }
//   };
//   this.openButtonOptions = {
//     text: "Abrir",
//     icon:'folder',
//     onClick: ()=> {
//         this.flowListpopupVisible = false;
//     }

// };

//   this.closeStageFlowButton = {
//     text: "Cerrar",
//     icon:'folder',
//     onClick: ()=> {
//         this.flowStagePropertiesVisible = false;
//     }

// };
// this.setStageFlowButton = {
//   text: "Cancelar",
//   icon:'folder',
//   onClick: ()=> {
//       this.flowStagePropertiesVisible = false;
//   }

// };



//   }
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
   
  }

//   getWorkflowList() {
//     this.WorkflowService.getWorkFlowByCompany("102").subscribe(resp => {
//       if (resp.IsSuccessful) {
//         this.workflowList = resp.Result;

//         this.workflowListData.next(this.workflowList);
//       }
//     })

//   }

//   showModalWorkflowList() {
//     this.flowListpopupVisible = true;
//   }

//   setFlowSelected(e) {
//     this.workflowSelected = e.data.value;
//     this.dropDownBoxWorflowList.instance.close();
//   }


}
