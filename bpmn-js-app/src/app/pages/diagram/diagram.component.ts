import {
  AfterContentInit,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  ViewChild,
  SimpleChanges,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import customTranslate from '../../customTranslate/customTranslate';
import paletteProvider from '../../modules/palette/paletteProvider';
import BpmnModdle from 'bpmn-moddle';
const moddle = new BpmnModdle();
/**
 * You may include a different variant of BpmnJS:
 *
 * bpmn-viewer  - displays BPMN diagrams without the ability
 *                to navigate them
 * bpmn-modeler - bootstraps a full-fledged BPMN editor
 */
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';

import { BehaviorSubject, from, Observable, Subscription, throwError } from 'rxjs';
import { Wf_Etapa } from 'src/app/models/bpm/Wf_Etapa';
import { DxDataGridComponent, DxDropDownBoxComponent, DxFormComponent, DxSelectBoxComponent, DxTextBoxComponent, DxTreeViewComponent } from 'devextreme-angular';
import { SessionService } from 'src/app/services/session.service';
import { ConfigService } from 'src/app/services/config.service';
import { WorkflowService } from '../../services/workflow.service';
import { OnInit } from '@angular/core';
import { Wf_Flujo } from '../../models/bpm/Wf_Flujo';
import { Wf_Formu } from '../../models/bpm/Wf_Formu';
import { FormService } from '../../services/form.service';
import notify from 'devextreme/ui/notify';
import { RolesService } from '../../services/roles.service';
import { UsersService } from '../../services/users.service';
import { Wf_Aptos } from '../../models/bpm/Wf_Aptos';
import { Wf_Deleg } from '../../models/bpm/Wf_Deleg';
import { Wf_Usegu } from '../../models/bpm/Wf_Usegu';
import { FormDetailService } from '../../services/form-detail.service';
import { FormDetail } from '../../models/bpm/Wf_Defor';
import { Wf_Frmas } from '../../models/bpm/Wf_Frmas';
import { StageFrmasService } from '../../services/stage-frmas.service';
import { Wf_Plant } from '../../models/bpm/Wf_Plant';
import { WfPlantService } from '../../services/wfplant.service';
import { SubProcess } from '../../models/bpm/subProcessForm';
import { WfWebseService } from '../../services/wfwebse.service';
import { Wf_Webse } from '../../models/bpm/Wf_Webse';
import { Wf_Mwebs } from '../../models/bpm/Wf_Mwebs';
import { Wf_Desti } from '../../models/bpm/Wf_Desti';
import { Wf_Pmeto } from '../../models/bpm/wfpmeto';
import { WfpmetoService } from '../../services/wfpmeto.service';
import { Wf_Pswet } from '../../models/bpm/Wf_Pswet';
import { v4 as uuidv4 } from "uuid";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Wf_Idocu } from '../../models/bpm/Wf_Idocu';
import { Wf_Accio } from '../../models/bpm/Wf_Accio';
import { Wf_Dplan } from '../../models/bpm/Wf_Dplan';
import { Wf_Urepo } from '../../models/bpm/Wf_Urepo';
import { Wf_Fetap } from '../../models/bpm/Wf_Fetap';
import { GnCcaleService } from '../../services/gnccale.service';
import { AlertService } from '../../services/alert.service';
import { Wf_Mxacc } from '../../models/bpm/Wf_Mxacc';
import DevExpress from 'devextreme';
import { element } from 'protractor';
import { threadId } from 'worker_threads';
const UPLOAD_URL = "Upload"
@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements AfterContentInit, OnChanges, OnDestroy, OnInit {
  fileAllowedExtensions: string[] = [];
  SESSION_ID = uuidv4();
  stagePropesrtiesItems: Wf_Etapa = new Wf_Etapa();
  @ViewChild('dropDownBoxWorflowList', { static: false }) dropDownBoxWorflowList: DxSelectBoxComponent;
  @ViewChild('3a02429e7f2549c18bed1cb3604a0df1', { static: false }) dataGridParamters: DxDataGridComponent;
  @ViewChild('30c0287c53f94d66a45d346d06fb4c7', { static: false }) textBoxTypeValue: DxTextBoxComponent;
  @ViewChild('9da4823ac32c42699b4e986344e344c3', { static: false }) textBoxNewAction: DxTextBoxComponent;
  @ViewChild('30c0287c53f94d66a45df346d06fb4c87', { static: false }) treeView: DxTreeViewComponent;
  @ViewChild("dropDownBoxfbd32edd") dropdownNewWorkFlowFormu: DxDropDownBoxComponent;
  @ViewChild("dropDownBoxaec8150b") dropdownNewSubProcess: DxDropDownBoxComponent;
  @ViewChild("dropDownBoxfbd32e41") dropdownWfWebse: DxDropDownBoxComponent;
  @ViewChild("dropDownBoxfbd32e42") dropdownWfWebseAction: DxDropDownBoxComponent;
  @ViewChild('formStageProperties',{static:true}) formStageProperties: DxFormComponent;
  @Input() flu_cont:number=0;

  elementSelected: any;
  title = 'EDITOR WORKFLOW';
  importError?: Error;
  closeButtonOptions: any;
  editionMode:string;
  webServiceButton: any;
  buttonNewAction: any;
  processButton: any;
  methodButton: any;
  closeButtonNewWorkFlowWindow: any;
  closeButtonNewSubprocesswWindow: any;
  closeButtonNewAssignament: any;
  closeButtonPopUpDestiny: any;
  closeButtonNewDelegated: any;
  closeButtonNewFollow: any;
  closeButtonNewFrmas: any;
  openButtonOptions: any;
  closeStageFlowButton: any;
  setStageFlowButton: any;
  setNewWorkFlowButton: any;
  buttonSetTypeField: any;
  buttonNewActionVisible: any;
  setNewSubprocessButton: any;
  setNewAssignamentButton: any;
  setNewDestinyMailUser: any;
  popupActionsVisibleButton: any;
  companyCode = 0;
  popupActionsWebServiceVisibleButton: any;
  popupProcessVisibleButton: any;
  newFrmasStage: any;
  propertyFrmasStage: any;
  deleteFrmasStage: any;
  setNewDelegateButton: any;
  setNewUrepoButton: any;
  setNewFollowButton: any;
  setNewDetalFormButton: any;
  gridDataSource: any;
  actionStageSelected: Wf_Accio = new Wf_Accio();
  workflowSelected: Wf_Flujo;
  newForkFlowFormtTemp: Wf_Formu = new Wf_Formu();
  formTypeField: string = "";
  newForkFlowForm: Wf_Formu = new Wf_Formu();
  newSubprocess: SubProcess = new SubProcess();
  wfFormuList: Wf_Formu[] = [];
  wfPlantItems: Wf_Plant[] = [];
  wfPlantDetailsItems: Wf_Dplan[] = [];
  usertsToAsign: Wf_Aptos[] = [];
  urepoToAsign: Wf_Urepo[] = [];
  delegateToAsign: Wf_Deleg[] = [];
  destinyToAsing: Wf_Desti[] = [];
  followToAsign: Wf_Usegu[] = [];
  formsDetailToAsig: FormDetail[] = [];
  wfFormasList: Wf_Frmas[] = [];
  stageServiceMethod: Wf_Mwebs;
  wfWebseItems: Wf_Webse[] = [];
  WfMwebsItems: Wf_Mwebs[] = [];
  wfPmetoItems: Wf_Pmeto[] = [];
  rolesCompany: any[] = [];
  usersCompany: any[] = [];
  workflowList: any[] = [];
  gridColumns: any = ['FLU_NOMB'];
  gnCcaleItems: any[] = [];
  subProcessFlowList: Wf_Flujo[] = [];
  newWorkFlowWindowVisible = false;
  poupTypeFieldVisible = false;
  popupNewActionVisible = false;
  popupNewServicePopupVisible = false;
  newSubprocessVisible = false;
  newAssignamentStageVisible = false;
  assignamentDestinyMailPopupVisible = false;
  actionsPopupVisible = false;
  actionsWebServicePopupVisible = false;
  popupProcessVisible = false;
  newDelegatedStageVisible = false;
  popupUrepoVisible = false;
  newFollowStageVisible = false;
  newFormDetailStageVisible = false;
  flowListpopupVisible = false;
  flowStagePropertiesVisible = false;
  workflowListData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  isGridBoxOpened: boolean;
  rowSelectedParamerts: any;
  calcItems = [{ text: 'Generación etapa', id: 'G' }, { text: 'Final Calendario', id: 'C' }]
  actionsStateWorkDone = [{ text: 'Completada', id: 'C' }, { text: 'En curso', id: 'E' }]
  calendarItems = [{ text: 'Normal', id: 'J' }, { text: 'De días hábiles', id: 'H' }]
  executorsItems = [{ text: 'Usuarios/Roles', id: 'U' }, { text: 'Iniciador del proceso', id: 'I' },
  { text: 'Tarea Anterior', id: 'N' }, { text: 'Plantilla', id: 'P' }];
  yesNoItems = [{ id: 'S', text: 'Si' }, { id: 'N', text: 'No' }];
  criteryExecutors = [{ text: 'Aleatorio', id: 'A' },
  { text: 'Secuencial', id: 'S' },
  { text: 'Balanceo de Cargas', id: 'B' },
  { text: 'Seleccionable en Ejecucion', id: 'E' },
  { text: 'Todos los Usuarios', id: 'T' },
  ];
  priorityItems = [{ text: 'Alta', id: 'A' }, { text: 'Media', id: 'M' }, { text: 'Baja', id: 'B' }];
  states = [{ id: 'A', text: 'Activo' }, { text: 'Inactivo', id: 'I' }];
  treeListTypeField = [{
    id: 1, text: 'Sistema', expanded: true, items: [
      { id: 'WF_CASOS.EMP_CODI', text: 'Empresa' },
      { id: 'WF_CASOS.CAS_CONT', text: 'Referencia' },
      { id: 'WF_CASOS.FLU_CONT', text: 'Proceso' }
    ]
  }]
  treeNodesActions: DevExpress.ui.dxTreeViewItem[] = [];
  emptyXml = `
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                    'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                    'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
                    'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
                    'targetNamespace="http://bpmn.io/schema/bpmn" ' +
                    'id="Definitions_1">' +
    '<bpmn:process id="Process_${this.SESSION_ID}" isExecutable="false">' +
      '<bpmn:startEvent id="StartEvent_1"/>' +
    '</bpmn:process>' +
    '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
      '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_${this.SESSION_ID}">' +
        '<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">' +
          '<dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0"/>' +
        '</bpmndi:BPMNShape>' +
      '</bpmndi:BPMNPlane>' +
    '</bpmndi:BPMNDiagram>' +
  '</bpmn:definitions>`;


  items: any[] = [
    {
      location: 'before', widget: 'dxButton', options: {
        icon: 'plus', text: 'Nuevo', onClick: () => {
          this.workflowSelected = new Wf_Flujo(this.companyCode);
          this.newWorkFlowWindowVisible = true;
        }
      }
    },
    {
      location: 'before', widget: 'dxButton', options: {
        icon: 'folder', text: 'Abrir', onClick: () => {
          this.flowListpopupVisible = true;
        }
      }
    },
    {
      location: 'before', widget: 'dxButton', options: {
        icon: 'save', text: 'Guardar', onClick: () => {

          this.saveXml();
        }
      }
    },
    {
      location: 'before', widget: 'dxButton', options: {
        icon: 'trash', text: 'Borrar', onClick: () => {

          this.bpmnJS.clear();
        }
      }
    },
    { location: 'before', widget: 'dxButton', options: { icon: 'fullscreen', text: 'Centrar' } },
    { location: 'before', widget: 'dxButton', options: { icon: 'remove', text: 'Cancelar' } }

  ];


  // Component
  private bpmnJS: BpmnJS;
  @ViewChild('ref', { static: true }) private el: ElementRef;
  @Output() private importDone: EventEmitter<any> = new EventEmitter();

  @Input() private url: string;
  private eventBus: any;
  constructor(private http: HttpClient, private WorkflowService: WorkflowService, private session: SessionService, private configService: ConfigService,
    private formsService: FormService, private rolesService: RolesService, private usersService: UsersService,
    private formDetailService: FormDetailService, private stageFrmasService: StageFrmasService,
    private wfPlantService: WfPlantService, private wfWebseService: WfWebseService,
    private wfPmetoService: WfpmetoService, private gnCcaleService: GnCcaleService, private sessionService: SessionService,
    private alertService: AlertService, private changeDetectorRef: ChangeDetectorRef) {




    try {


      this.companyCode = this.session.session.selectedCompany.code;
      this.showPopUpTemplate = this.showPopUpTemplate.bind(this);

      var customTranslateModule = {
        translate: ['value', customTranslate],
      };


      var paletteModule = {
        __init__: ['paletteProvider'],
        paletteProvider: ['type', paletteProvider]
      }

      this.bpmnJS = new BpmnJS({
        additionalModules: [
          paletteModule,
          customTranslateModule,
        ]
      });



      this.bpmnJS.on('import.done', ({ error }) => {
        if (!error) {
          this.bpmnJS.get('canvas').zoom('fit-viewport');

        }
      });

      this.bpmnJS.on('commandStack.changed', () => {
        console.log('commandStack');
      });

      this.bpmnJS.on('element.changed', (event) => {
        console.log('element.changed');
        const element = event.element;

        // the element was changed by the user
      });

      this.bpmnJS.on('element.click', (event) => {
        console.log(event);
        const element = event.element;

        // the element was changed by the user
      });
      this.bpmnJS.on('element.dblclick', (event) => {
        // Se limpia el elemento asociado a las etapas
        this.stagePropesrtiesItems = new Wf_Etapa();
        switch (event.element.type) {
          case 'bpmn:SequenceFlow':
            break;
          case "bpmn:Process":
            this.popupProcessVisible = true;
            break;
          case 'bpmn:SubProcess':
            this.newSubprocessVisible = true;
            this.elementSelected = event;
            break;
          case 'bpmn:StartEvent':
            if (event.element.businessObject.eventDefinitions != undefined &&
              event.element.businessObject.eventDefinitions.length > 0) {
              if (event.element.businessObject.eventDefinitions[0].type == "bpmn:MessageEventDefinition" || event.element.businessObject.eventDefinitions[0].$type) {
                this.loadPropertiesPanel(event);
                break;
              }
            }
          case 'bpmn:EndEvent':
            break;
          default:
            this.loadPropertiesPanel(event)
            break;
        }
        
      });

      this.eventBus = this.bpmnJS.get('eventBus');

      this.eventBus.on('shape.added', (event) => {
        console.log(event);
        this.buildNewStage(event);
      });


      this.closeButtonNewWorkFlowWindow = {
        text: "Cerrar",
        icon: 'remove',
        onClick: () => {
          this.newWorkFlowWindowVisible = false;
        }
      };
      this.closeButtonNewSubprocesswWindow = {
        text: "Cerrar",
        icon: 'remove',
        onClick: () => {
          this.newSubprocessVisible = false;
        }
      };

      this.processButton = {
        text: "Procedimiento",
        icon: 'insertcolumnleft',
        onClick: () => {
          this.newSubprocessVisible = false;
        }
      };

      this.methodButton = {
        text: "Procedimiento",
        icon: 'insertcolumnleft',
        onClick: () => {
          this.newSubprocessVisible = false;
        }
      };






      this.webServiceButton = {
        text: "Servicio web",
        icon: 'globe',
        onClick: () => {

        }


      }

      this.buttonNewAction = {
        text: "Nueva",
        icon: 'plus',
        onClick: () => {

          this.popupNewActionVisible = true;
        }


      }


      this.closeButtonNewAssignament = {
        text: "Cerrar",
        icon: 'remove',
        onClick: () => {
          this.newAssignamentStageVisible = false;
        }
      };
      this.closeButtonPopUpDestiny = {
        text: "Cerrar",
        icon: 'remove',
        onClick: () => {
          this.newAssignamentStageVisible = false;
        }
      };


      this.closeButtonNewDelegated = {
        text: "Cerrar",
        icon: 'remove',
        onClick: () => {
          this.newDelegatedStageVisible = false;
        }
      };

      this.closeButtonNewFollow = {
        text: "Cerrar",
        icon: 'remove',
        onClick: () => {
          this.newDelegatedStageVisible = false;
        }
      };
      this.closeButtonNewFrmas = {
        text: "Cerrar",
        icon: 'remove',
        onClick: () => {
          this.newFormDetailStageVisible = false;
        }
      };

      this.openButtonOptions = {
        text: "Abrir",
        icon: 'folder',
        onClick: () => {
          this.flowListpopupVisible = false;
        }

      };

      this.closeStageFlowButton = {
        text: "Cerrar",
        icon: 'folder',
        onClick: () => {
          this.flowStagePropertiesVisible = false;
        }

      };
      this.setStageFlowButton = {
        text: "Aplicar",
        icon: 'check',
        onClick: () => {
          this.closePopupStageProperties();
        }

      };
      this.setNewWorkFlowButton = {
        text: "Aceptar",
        icon: 'check',
        onClick: () => {
          this.editionMode ="POST";
          this.newWorkFlowWindowVisible = false;
          this.workflowSelected.FOR_CONT = this.newForkFlowFormtTemp.FOR_CONT;
          this.workflowSelected.FLU_NOMB = this.newForkFlowFormtTemp.FOR_NOMB;
          this.getFormFrmas();
          this.getFlowsSubprocess();
          this.setFormWorkFlow();
        }
      };


      this.buttonSetTypeField = {
        text: "Aceptar",
        icon: 'check',
        onClick: () => {
          this.textBoxTypeValue.instance.option("value", "");
          this.poupTypeFieldVisible = false;

        }
      }


      this.buttonNewActionVisible = {
        text: "Aceptar",
        icon: 'check',
        onClick: () => {
          this.addNewAction()
        }
      }

      this.setNewSubprocessButton = {
        text: "Aceptar",
        icon: 'check',
        onClick: () => {

          this.newSubprocessVisible = false;
          
          this.elementSelected.element.WF_ETAPA = new Wf_Etapa();
          this.elementSelected.element.WF_ETAPA.ETA_ASUN = this.buildAsun(this.elementSelected);
          this.elementSelected.element.WF_ETAPA.FLU_COND = this.newSubprocess.flu_cont;
        }

      };

      this.setNewAssignamentButton = {
        text: "Asignar",
        icon: 'plus',
        onClick: () => {
          this.newAssignamentStageVisible = true;

        }

      };
      this.setNewDestinyMailUser = {
        text: "Asignar",
        icon: 'plus',
        onClick: () => {
          this.assignamentDestinyMailPopupVisible = true;

        }

      };

      this.popupActionsVisibleButton = {
        text: "Asignar",
        icon: 'plus',
        onClick: () => {
          this.actionsPopupVisible = true;
        }
      };


      this.popupActionsWebServiceVisibleButton = {
        text: "Nuevo",
        icon: 'plus',
        onClick: () => {
          this.actionsWebServicePopupVisible = true;
        }
      };

      this.popupProcessVisibleButton = {
        text: "Asignar",
        icon: 'plus',
        onClick: () => {
          this.popupProcessVisible = true;
        }
      };

      this.newFrmasStage = {
        text: "Nuevo",
        icon: 'plus',
        width: '140px',
        onClick: () => {
          this.newFormDetailStageVisible = true;
        }

      };

      this.propertyFrmasStage = {
        text: "Propiedad",
        icon: 'floppy',
        disabled: true,
        width: '140px',
        onClick: () => {
          // implementar
        }

      };

      this.deleteFrmasStage = {
        text: "Borrar",
        icon: 'deleterow',
        width: '140px',
        disabled: true,
        onClick: () => {
          // implementar

        }

      };

      this.setNewDelegateButton = {
        text: "Asignar",
        icon: 'plus',
        onClick: () => {
          this.newDelegatedStageVisible = true;
        }
      };


      this.setNewUrepoButton = {
        text: "Asignar",
        icon: 'plus',
        onClick: () => {
          this.popupUrepoVisible = true;

        }

      };
      this.setNewFollowButton = {
        text: "Asignar",
        icon: 'plus',
        onClick: () => {
          this.newFollowStageVisible = true;

        }

      };

      this.setNewDetalFormButton = {
        text: "Nuevo",
        icon: 'plus',
        onClick: () => {
          this.newFormDetailStageVisible = true;

        }

      };

      this.fileAllowedExtensions = [
        ".pdf",
        ".doc",
        ".docx",
        ".jpeg",
        ".jpg",
        ".png",
        ".PNG"
      ]
    } catch (error) {
      this.alertService.errorSweet(error, "Error");
    }


  }

  loadPropertiesPanel(event) {
    console.log(event);  
    this.elementSelected = event;  
    this.flowStagePropertiesVisible = true;
    
    this.stagePropesrtiesItems = event.element.WF_ETAPA;
    //  this.formStageProperties.instance.updateData(this.stagePropesrtiesItems);
  }

  closePopupStageProperties() {
    if (!this.validWF_PSWET())
      return;
    this.elementSelected.element.WF_ETAPA = this.stagePropesrtiesItems;
    this.stagePropesrtiesItems = new Wf_Etapa();
    this.flowStagePropertiesVisible = false;
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

  async ngOnInit() {
    
    try {
      if (this.sessionService.session == undefined) {

        throw new Error("Acceso no autorizado");

      }

      //  await this.configService.getAppConfig();
      this.getWorkflowList();
      this.GetWfFormu();
      this.getUsertsToAsign();
      this.getWfPlant();
      this.getWfWebseByCompany();
      this.getGnCcale();
      // this.initEmpty();
      if(this.flu_cont>0){
       this.loadFlow(this.flu_cont);
      }


    } catch (error) {

    }


  }
  GetWfFormu() {
    this.formsService.getwfFormuList().subscribe(resp => {
      if (resp.IsSuccessful && resp.Result != null) {
        this.wfFormuList = resp.Result;
      }
    })
  }
  getGnCcale() {
    this.gnCcaleService.Get().subscribe(resp => {
      if (resp != null && resp.IsSuccessful)
        this.gnCcaleItems = resp.Result;
    })
  }
  getWorkflowList() {
    this.WorkflowService.getWorkFlowByCompany(this.companyCode).subscribe(resp => {
      if (resp.IsSuccessful) {
        this.workflowList = resp.Result;

        this.workflowListData.next(this.workflowList);
      }
    })

  }

  getWfPlant() {
    this.wfPlantService.getByCompany(this.companyCode).subscribe(resp => {
      if (resp.IsSuccessful && resp.Result != null) {

        this.wfPlantItems = resp.Result;
        this.getWfPlantDetails();

      }
    })
  }


  getWfPlantDetails() {
    this.wfPlantService.getAllDetails(this.companyCode).subscribe(resp => {
      if (resp.IsSuccessful && resp.Result != null) {
        this.wfPlantDetailsItems = resp.Result;
        this.getFilteredPlantItems = this.getFilteredPlantItems.bind(this);
      }
    })
  }

  getFormFrmas() {
    this.stageFrmasService.getWfFrmas(this.workflowSelected.FOR_CONT).subscribe(resp => {
      if (resp.IsSuccessful && resp.Result != null) {
        this.wfFormasList = resp.Result;
      }
    })
  }

  getUsertsToAsign() {
    this.rolesService.getWfRoles(this.companyCode).subscribe(rolesResp => {
      if (rolesResp.IsSuccessful && rolesResp != null) {
        this.rolesCompany = rolesResp.Result;
        this.usersService.getUsers(this.companyCode).subscribe(usersResp => {
          if (usersResp.IsSuccessful && usersResp != null) {
            this.usersCompany = usersResp.Result;
            if (this.rolesCompany != null && this.rolesCompany.length > 0) {
              this.rolesCompany.forEach(role => {
                this.usertsToAsign.push({
                  EMP_CODI: this.companyCode, ETA_CONT: this.stagePropesrtiesItems.ETA_CONT, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, APT_DEST: role.ROL_CODI,
                  APT_TDES: 'R', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12'
                });
                this.delegateToAsign.push({
                  EMP_CODI: this.companyCode, ETA_CONT: this.stagePropesrtiesItems.ETA_CONT, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, DEL_DEST: role.ROL_CODI,
                  DEL_TDES: 'R', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12'
                });
                this.followToAsign.push({
                  EMP_CODI: this.companyCode, ETA_CONT: this.stagePropesrtiesItems.ETA_CONT, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, USE_DEST: role.ROL_CODI,
                  USE_TDES: 'R', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12'
                });
                this.destinyToAsing.push({
                  EMP_CODI: this.companyCode, ETA_CONT: this.stagePropesrtiesItems.ETA_CONT, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, DES_DEST: role.ROL_CODI,
                  DES_TDES: 'R', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12', DPL_CONT: 0, PLA_CONT: 0
                });
                this.urepoToAsign.push({
                  EMP_CODI: this.companyCode, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, URE_DEST: role.ROL_CODI,
                  URE_TDES: 'R', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12'
                });
              });

            }
            if (this.usersCompany != null && this.usersCompany.length > 0) {
              this.usersCompany.forEach(user => {
                this.usertsToAsign.push({
                  EMP_CODI: this.companyCode, ETA_CONT: this.stagePropesrtiesItems.ETA_CONT, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, APT_DEST: user.USU_CODI,
                  APT_TDES: 'U', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12'
                })
                this.delegateToAsign.push({
                  EMP_CODI: this.companyCode, ETA_CONT: this.stagePropesrtiesItems.ETA_CONT, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, DEL_DEST: user.USU_CODI,
                  DEL_TDES: 'U', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12'
                });
                this.followToAsign.push({
                  EMP_CODI: this.companyCode, ETA_CONT: this.stagePropesrtiesItems.ETA_CONT, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, USE_DEST: user.USU_CODI,
                  USE_TDES: 'U', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12'
                });
                this.destinyToAsing.push({
                  EMP_CODI: this.companyCode, ETA_CONT: this.stagePropesrtiesItems.ETA_CONT, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, DES_DEST: user.USU_CODI,
                  DES_TDES: 'U', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12', DPL_CONT: 0, PLA_CONT: 0
                });
                this.urepoToAsign.push({
                  EMP_CODI: this.companyCode, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, URE_DEST: user.USU_CODI,
                  URE_TDES: 'U', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12'
                });
              });
            }
          }
          this.usertsToAsign.sort((a, b) => (a.APT_DEST > b.APT_DEST) ? 1 : ((b.APT_DEST > a.APT_DEST) ? -1 : 0))
          this.delegateToAsign.sort((a, b) => (a.DEL_DEST > b.DEL_DEST) ? 1 : ((b.DEL_DEST > a.DEL_DEST) ? -1 : 0))
          this.followToAsign.sort((a, b) => (a.USE_DEST > b.USE_DEST) ? 1 : ((b.USE_DEST > a.USE_DEST) ? -1 : 0))
        })
      }
    })
  }


  getFormsDetail(for_cont) {
    this.formDetailService.GetDetailFormList(for_cont).subscribe(resp => {
      if (resp.IsSuccessful && resp.Result != null) {
        this.formsDetailToAsig = resp.Result;
      }
    })
  }


  getFlowsSubprocess() {
    var filter = this.workflowSelected.FLU_CONT == undefined ? -1 : this.workflowSelected.FLU_CONT;
    this.WorkflowService.getForSubprocess(this.companyCode, filter).subscribe(resp => {
      if (resp.IsSuccessful && resp.Result != null)
        this.subProcessFlowList = resp.Result;
    })
  }
  showModalWorkflowList() {
    this.flowListpopupVisible = true;
  }

  setFlowSelected(e) {
    if (e.data != null) {
      this.flowListpopupVisible = false;
      
      this.editionMode="GET"
      this.loadFlow(e.data.FLU_CONT);
    }
  }

  loadFlow(id) {
    this.WorkflowService.getWorkFlowById(this.companyCode, id).subscribe(resp => {
      if (resp.IsSuccessful && resp.Result != null) {
        // this.workflowSelected = resp.Result;
        this.buildXml(resp.Result.xml);
        this.workflowSelected = resp.Result.flow;
        // this.WorkflowService.buildXml();
      }
    })
  }

  ngAfterContentInit(): void {
    this.bpmnJS.attachTo(this.el.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('cambia');
    // re-import whenever the url changes
    if (changes.url) {
      this.loadUrl(changes.url.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.bpmnJS.destroy();
  }


  /**
   * Load diagram from URL and emit completion event
   */
  loadUrl(url: string): Subscription {
    console.log('carga');
    return (
      this.http.get(url, { responseType: 'text' }).pipe(
        switchMap((xml: string) => this.importDiagram(xml)),
        map(result => result.warnings),
      ).subscribe(
        (warnings) => {
          this.handleImported(
            {
              type: 'success',
              warnings
            })
        },
        (err) => {
          this.handleImported({
            type: 'error',
            error: err
          });
        }
      )
    );
  }


  loadXml(url: string): Subscription {
    console.log('carga');
    return (
      this.http.get(url, { responseType: 'text' }).pipe(
        switchMap((xml: string) => this.importDiagram(xml)),
        map(result => result.warnings),
      ).subscribe(
        (warnings) => {
          this.handleImported(
            {
              type: 'success',
              warnings
            })
        },
        (err) => {
          this.handleImported({
            type: 'error',
            error: err
          });
        }
      )
    );
  }

  saveXml() {
    const rootElement = this.bpmnJS.get('canvas').getRootElement();
    console.log(rootElement);
    this.bpmnJS.saveXML().then((xml) => {
      console.log(xml);
      this.WorkflowService.setWorkFlow(xml, rootElement, this.workflowSelected).subscribe(resp => {
        console.log(resp);
        if (resp.Result != null && resp.IsSuccessful) {
          notify('Flujo creado correctamente', 'success', 5000);
        }
      })
    });
  }

  getYesOrno(value: string) {
    if (value != null && value != undefined) {
      if (value.toUpperCase() == "S")
        return true;
      else
        return false;
    }
  }

  setYesOrno(e) {
    if (e == "N")
      this.stagePropesrtiesItems.ETA_INIC == "N"
    else
      this.stagePropesrtiesItems.ETA_INIC == "S"
  }

  init(e) {
    console.log(e);

  }


  /**
   * Creates a Promise to import the given XML into the current
   * BpmnJS instance, then returns it as an Observable.
   *
   * @see https://github.com/bpmn-io/bpmn-js-callbacks-to-promises#importxml
   */
  private importDiagram(xml: string): Observable<{ warnings: Array<any> }> {
    return from(this.bpmnJS.importXML(xml) as Promise<{ warnings: Array<any> }>);
  }
  async buildXml(xmlData: string) {

    let xml = xmlData;
    console.log(xml);
    this.bpmnJS.importXML(xml);
    return;

  }

  setFormWorkFlowTemp(e) {
    this.newForkFlowFormtTemp = e.data;
    this.dropdownNewWorkFlowFormu.instance.close();
  }

  addNewExecutor(e) {
    this.stagePropesrtiesItems.WF_APTOS.push(e.data);
    this.newAssignamentStageVisible = false;
  }

  addNewUrepo(e) {
    this.workflowSelected.WF_UREPO.push(e.data);
    this.popupUrepoVisible = false;
  }

  addNewDestinyUser(e) {
    this.stagePropesrtiesItems.WF_DESTI.push(e.data);
    this.assignamentDestinyMailPopupVisible = false;
  }

  addNewDelegated(e) {
    this.stagePropesrtiesItems.WF_DELEG.push(e.data);
    this.newDelegatedStageVisible = false;
  }
  addNewFollow(e) {
    this.stagePropesrtiesItems.WF_USEGU.push(e.data);
    this.newFollowStageVisible = false;
  }
  addNewFormDetail(e) {
    this.stagePropesrtiesItems.WF_FETAP.push(e.data);
    this.newFormDetailStageVisible = false;
  }
  setFormWorkFlow() {
    this.initEmpty();
    this.newWorkFlowWindowVisible = false;
  }

  initEmpty() {
    this.bpmnJS.clear();
    this.bpmnJS.importXML(this.emptyXml);
    const rootElement = this.bpmnJS.get('canvas').getRootElement();
    rootElement.id = this.SESSION_ID;
  }

  setNewAssignament() {

  }

  isTemplate(data) {

    if (data.indexOf('CWFFPLAN') > -1) {
      return true;
    }
    else return false;
  }

  setNewSubprocess(e) {
    this.newSubprocess.flu_cont = e.data.FLU_CONT;
    this.newSubprocess.flu_nomb = e.data.FLU_NOMB;
    this.dropdownNewSubProcess.instance.close();
  }


  buildNewStage(event) {

      if(this.editionMode=="POST")
    event.element.WF_ETAPA = new Wf_Etapa();
    event.element.WF_ETAPA.ETA_ASUN = this.buildAsun(event);
    event.element.businessObject.name = event.element.WF_ETAPA.ETA_ASUN;
    if(this.editionMode=="GET"){
      let nameStage:string = event.element.id;
      
      
      event.element.WF_ETAPA = this.workflowSelected.WF_ETAPAS.filter(e=>e.ETA_CONT == Number(nameStage.split('_')[3]));    
      event.element.businessObject.name = event.element.WF_ETAPA.ETA_ASUN;
    }

  }

  buildAsun(event) {
    switch (event.element.type) {
      case "bpmn:StartEvent":
        if (event.element.businessObject.eventDefinitions != undefined &&
          event.element.businessObject.eventDefinitions.length > 0) {
          if (event.element.businessObject.eventDefinitions[0].type == "bpmn:MessageEventDefinition" || event.element.businessObject.eventDefinitions[0].$type) {
            return "Inicio con mensaje"
          }
        }
        else {
          return "Inicio";
        }
      case "bpmn:UserTask":
        return "Tarea de usuario";
      case "bpmn:Task":
        return "Tarea";
      case "bpmn:ExclusiveGateway":
        return "Compuerta exclusiva";
      case "bpmn:serviceTask":
        return "Tarea de servicio";
      case "bpmn:ServiceTask":
        return "Tarea de servicio";
      case "bpmn:sendTask":
        return "Tarea de email";
      case "bpmn:SendTask":
        return "Tarea de email";
      case "bpmn:EndEvent":
        if (event.element.businessObject.eventDefinitions != undefined &&
          event.element.businessObject.eventDefinitions.length > 0) {
          if (event.element.businessObject.eventDefinitions[0].type == "bpmn:TerminateEventDefinition" || event.element.businessObject.eventDefinitions[0].$type) {
            return "Finalización Proceso";
          }
        }
        else {
          return "Finalización corriente";
        }
      case "bpmn:ScriptTask":
        return "Tarea de script";
      case "bpmn:ParallelGateway":
        return "Compuerta paralela";
      case "bpmn:ComplexGateway":
        "Compuerta compleja";
      case "bpmn:InclusiveGateway":
        return "Compuerta inclusiva";
      case "bpmn:BusinessRuleTask":
        return "Tarea regla negocio";
      case "label":
        return event.element.businessObject.name;
      case "bpmn:SubProcess":
        return "Subproceso";
      default:
        return "Elemento no mapeado";

    }

  }


  getWfWebseByCompany() {
    this.wfWebseService.getByCompany(this.companyCode).subscribe(resp => {
      if (resp.IsSuccessful && resp.Result != null) {
        this.wfWebseItems = resp.Result;

      }
    })
  }


  setWfWebse(e: any) {
    console.log(e.data);
    this.stagePropesrtiesItems.WEB_CONT = e.data.WEB_CONT;
    this.stagePropesrtiesItems.MWE_CONT = e.data.MWE_CONT;
    this.stageServiceMethod = e.data;
    // this.getWfPmetoByService(this.companyCode,this.stagePropesrtiesItems.WEB_CONT,this.stagePropesrtiesItems.MWE_CONT);
    this.wfPmetoService.getByService(this.companyCode, this.stagePropesrtiesItems.WEB_CONT = e.data.WEB_CONT, this.stagePropesrtiesItems.MWE_CONT = e.data.MWE_CONT).subscribe(resp => {

      if (resp.IsSuccessful && resp.Result != null) {
        this.wfPmetoItems = resp.Result;
        // Llenar un wf_pswet con un wf_pmeto
        resp.Result.forEach(element => {
          let wfpswet: Wf_Pswet = {
            EMP_CODI: element.EMP_CODI,
            ETA_CONT: this.stagePropesrtiesItems.ETA_CONT,
            FLU_CONT: this.stagePropesrtiesItems.FLU_CONT,
            FRM_CODI: "",
            MWE_CONT: element.MWE_CONT,
            PLA_CONT: 0,
            PME_CONT: element.PME_CONT,
            PME_PADR: 0,
            PME_SECU: element.PME_SECU,
            PSW_CAMP: "",
            PSW_CONT: 0,
            PSW_NCAM: "",
            PSW_VALO: "",
            WEB_CONT: this.stagePropesrtiesItems.WEB_CONT,
            PSW_TABL: "",
            AUD_ESTA: "A",
            AUD_UFAC: new Date(),
            DGR_CONT: 0,
            CAM_CODI: "",
            AUD_USUA: "",
            PSW_TVAL: "C",
            DPL_CONT: 0,
            PME_TIPO: element.PME_TIPO,
            PME_CLAS: element.PME_CLAS
          }
          this.stagePropesrtiesItems.WF_PSWET.push(wfpswet)
        }
        );
      }
    })
    this.dropdownWfWebse.instance.close();
  }

  buildWfPmeto() {

  }


  getWPmeto() {


  }
  tabInstructiveVisibility() {

    if (this.elementSelected.element.type == "bpmn:UserTask")
      return false;
    if (this.elementSelected.element.type == "bpmn:StartEvent") {
      if (this.elementSelected.element.businessObject.eventDefinitions != undefined &&
        this.elementSelected.element.businessObject.eventDefinitions.length > 0) {
        if (this.elementSelected.element.businessObject.eventDefinitions[0].type == "bpmn:MessageEventDefinition" || this.elementSelected.element.businessObject.eventDefinitions[0].$type) {
          return false;
        }
      }
      else {
        return true;
      }
    }
    else
      return true;
  }

  tabFormVisibility() {

    // "tarea usuario,tarea de servicio, inicio mensaje"

    switch (this.elementSelected.element.type) {
      case "bpmn:UserTask":
        return false;
      case "bpmn:serviceTask":
        return false;
      case "bpmn:ServiceTask":
        return false;
      case "bpmn:serviceTask":
        return false;
      case "bpmn:ServiceTask":
        return false;
      case "bpmn:BusinessRuleTask":
        return false;
      case "bpmn:StartEvent":
        if (this.elementSelected.element.businessObject.eventDefinitions != undefined &&
          this.elementSelected.element.businessObject.eventDefinitions.length > 0) {
          if (this.elementSelected.element.businessObject.eventDefinitions[0].type == "bpmn:MessageEventDefinition" || this.elementSelected.element.businessObject.eventDefinitions[0].$type) {
            return false;
          }
        }
        else {
          return true;
        }
      default:
        return true;
    }

  }

  tabExecutorsVisibility() {
    if (this.elementSelected.element.type == "bpmn:UserTask")
      return false;
    else return true;
  }

  tabDelegableVisibility() {
    if (this.elementSelected.element.type == "bpmn:UserTask")
      return false;
    else return true;
  }


  tabFollowUpVisibility() {
    switch (this.elementSelected.element.type) {
      case "bpmn:StartEvent":
        if (this.elementSelected.element.businessObject.eventDefinitions != undefined &&
          this.elementSelected.element.businessObject.eventDefinitions.length > 0) {
          if (this.elementSelected.element.businessObject.eventDefinitions[0].type == "bpmn:MessageEventDefinition" || this.elementSelected.element.businessObject.eventDefinitions[0].$type) {
            return false;
          }
        }
        else {
          return true;
        }
      case "bpmn:UserTask":
        return false;
      default:
        return true;
    }
 
  }

  tabActionsVisibility() {
    switch (this.elementSelected.element.type) {
      case "bpmn:ExclusiveGateway":
        return false;
      case "bpmn:InclusiveGateway":
        return false;
      case "bpmn:ComplexGateway":
        return false;
      case "bpmn:ComplexGateway":
        return false;
      default:
        return true;
    }

  }

  tabSimulationVisibility() {
    // inicio con mensaje
    // tarea de usuario

    switch (this.elementSelected.element.type) {
      case "bpmn:StartEvent":
        if (this.elementSelected.element.businessObject.eventDefinitions != undefined &&
          this.elementSelected.element.businessObject.eventDefinitions.length > 0) {
          if (this.elementSelected.element.businessObject.eventDefinitions[0].type == "bpmn:MessageEventDefinition" || this.elementSelected.element.businessObject.eventDefinitions[0].$type) {
            return false;
          }
        }
        else {
          return true;
        }
      case "bpmn:UserTask":
        return false;
      default:
        return true;
    }
  }

  tabInformationAditionalTab() {
    if (this.elementSelected.element.type == "bpmn:UserTask")
      return false;
    else return true;
  }

  tabWebServiceVisibility() {

    switch (this.elementSelected.element.type) {
      case "bpmn:serviceTask":
        return false;
      case "bpmn:ServiceTask":
        return false;

      default:
        return true;
    }
  }

  tabMailVisibility() {
    if (this.elementSelected.element.type == "bpmn:SendTask")
      return false;
    else
      return true;
  }


  test(options) {
    
  }
  calculatedDataType(rowData) {
    if (this.wfPmetoItems != null && this.wfPmetoItems.length > 0) {
      var data = this.wfPmetoItems.filter(t => t.EMP_CODI && this.companyCode && t.WEB_CONT == this.stagePropesrtiesItems.WEB_CONT && t.MWE_CONT == this.stagePropesrtiesItems.MWE_CONT)[0].PME_TIPO;
      switch (data) {
        case "N":
          return "Número";
        case "C":
          return "string";
        case "F":
          return "Fecha";
        case "E":
          return "Estructura";
        default:
          return "";
      }
    }
    return "";

  }
  calculatedClass(rowData) {
    
    if (this.wfPmetoItems != null && this.wfPmetoItems.length > 0) {
      return this.wfPmetoItems.filter(t => t.EMP_CODI && this.companyCode && t.WEB_CONT == this.stagePropesrtiesItems.WEB_CONT && t.MWE_CONT == this.stagePropesrtiesItems.MWE_CONT)[0].PME_CLAS;
    }
    return "";
  }

  calculatedSecu(rowData) {
    if (this.wfPmetoItems != null && this.wfPmetoItems.length > 0) {
      return this.wfPmetoItems.filter(t => t.EMP_CODI && this.companyCode && t.WEB_CONT == this.stagePropesrtiesItems.WEB_CONT && t.MWE_CONT == this.stagePropesrtiesItems.MWE_CONT)[0].PME_SECU;
    }
    return "";
  }

  beforeSend() {
  }

  checkDocuments() {
  }

  addIdParameter(e) {
    let uploadUrl = this.updateQueryStringParameter(
      `${this.configService.config.apiRwfEditrUrl}${UPLOAD_URL}`,
      "uuid",
      this.SESSION_ID
    );

    uploadUrl = this.updateQueryStringParameter(
      uploadUrl,
      "stage",
      this.elementSelected.element.id
    );
    e.component.option("uploadUrl", uploadUrl);
  }

  updateQueryStringParameter(uri, key, value) {
    const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    const separator = uri.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
      return uri + separator + key + "=" + value;
    }
  }

  setPlacont_value(rowData: any, value: any): void {

    rowData.DPL_CONT = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }


  getFilteredPlantItems(options) {
    return {
      store: this.wfPlantDetailsItems,
      filter: options.data ? ["PLA_CONT", "=", options.data.PLA_CONT] : null
    };
  }

  initNewRowActions(e) {

  }

  openPopUpActions(e) {
    this.actionStageSelected = e.data;
    this.actionsPopupVisible = true;
  }

  onEditorPreparingGridActionsDetail(e) {
    if (e.parentType === "dataRow" && e.dataField === "DPL_CONT") {
      e.editorOptions.disabled = (typeof e.row.data.StateID !== "number");
    }
  }

  addNewWfFetap(e) {
    const index = this.wfFormasList.indexOf(e.data, 0);
    if (index > -1) {
      this.wfFormasList.splice(index, 1);
    }
    let newFetap: Wf_Fetap = {

      EMP_CODI: this.companyCode,
      FLU_CONT: this.workflowSelected.FLU_CONT,
      ETA_CONT: this.stagePropesrtiesItems.ETA_CONT,
      FRM_CODI: e.data.FRM_CODI,
      FOR_CONT: this.workflowSelected.FOR_CONT,
      FET_INSE: 'N',
      FET_ORDE: 0,
      FET_DELE: 'N',
      FET_DEFU: 'N',
      PLA_CONT: -1,
      AUD_ESTA: 'A',
      FET_SDIN: 'N',
      AUD_UFAC: new Date(),
      AUD_USUA: ''

    };
    this.stagePropesrtiesItems.WF_FETAP.push(newFetap);
    this.newFormDetailStageVisible = false;
  }

  showPopUpTemplate(e) {
    let row: Wf_Pswet = e.row.data;
    this.rowSelectedParamerts = e.row;
    this.poupTypeFieldVisible = true;

  }

  selectTypeField(e) { 
    if (e.itemData.id != "1") {
      this.rowSelectedParamerts.data.PSW_VALO = e.itemData.id;
      this.poupTypeFieldVisible = false;
    }

  }

  selectTypeFieldTxt(e) {

    let data: string = e.value;
    if (data != "") {
      this.rowSelectedParamerts.data.PSW_VALO = data;
    }


  }


  setNewActionName(e) {

    let data: string = e.value;
    if (data != "") {
      this.stagePropesrtiesItems.WF_ACCIO.push
    }
  }

  addNewAction() {

    let name: string = this.textBoxNewAction.value;
    if (name != "") {
      let action: Wf_Accio = new Wf_Accio();
      action.EMP_CODI = this.companyCode;
      action.FLU_CONT = this.workflowSelected.FLU_CONT;
      action.ETA_CONT = this.stagePropesrtiesItems.ETA_CONT;
      action.ACC_CONT = this.stagePropesrtiesItems.WF_ACCIO.length == 0 ? 1 : Math.max.apply(Math, this.stagePropesrtiesItems.WF_ACCIO.map(function (o) { return o.ACC_CONT; })) + 1;
      action.ACC_NOMB = name;
      action.ACC_ESTA = name.toUpperCase();
      action.ACC_ABRE = name.length < 3 ? name : name.substring(0, 3);
      action.AUD_ESTA = "A";
      action.PLA_CONT = 0;
      action.DPL_CONT = 0;
      action.ACC_DEFE = "N";
      action.ACC_ESTT = "C"
      this.stagePropesrtiesItems.WF_ACCIO.push(action);
      this.treeNodesActions.push({ parentId: action.ACC_CONT, text: action.ACC_NOMB, expanded: true, items: [] })
      this.textBoxNewAction.value = "";
      this.popupNewActionVisible = false;
    }
  }

  selectAction(e) {  
    this.actionStageSelected = this.stagePropesrtiesItems.WF_ACCIO.filter(a => a.ACC_CONT == e.itemData.parentId)[0];
  }

  validWF_PSWET() {  
    if (this.stagePropesrtiesItems.WF_PSWET != null && this.stagePropesrtiesItems.WF_PSWET.filter(p => p.PSW_VALO.length == 0).length > 0) {
      this.alertService.error("Pestaña Servicio web: Todos los parámetros necesitan un campo a utilizar")
      return false;
    }
    return true;
  }



  openModalNewAction() {

    this.popupNewActionVisible = true;
  }

  openPopupService() {

    this.popupNewServicePopupVisible = true;
  }

  openPopupMethod() {

  }

  deleteAction() {

  }
  openPopupProcess() {

  }

  addNewMxAcc(e: any) {
    console.log(e);
    let data: Wf_Mxacc = new Wf_Mxacc();
    data.EMP_CODI = this.workflowSelected.EMP_CODI;
    data.FLU_CONT = this.workflowSelected.FLU_CONT;
    data.ACC_CONT = this.actionStageSelected.ACC_CONT;
    data.FRM_CODI = this.wfWebseItems.filter(m => m.WEB_CONT == e.data.WEB_CONT)[0].WEB_CODI;
    data.MET_CONT = e.data.MWE_CONT;
    data.MXA_SECU = this.actionStageSelected.WF_MXACC.length == 0 ? 1 : Math.max.apply(Math, this.actionStageSelected.WF_MXACC.map(function (o) { return o.MXA_SECU; })) + 1;
    data.AUD_ESTA = "A";
    data.MXA_CLAS = "W";
    this.actionStageSelected.WF_MXACC.push(data);
    this.treeView.instance.beginUpdate();
    this.treeView.items.filter(i => i.parentId == this.actionStageSelected.ACC_CONT)[0].items = [{ parentId: 0, expanded: true, items: [], text: data.FRM_CODI }]
    this.treeView.instance.endUpdate();
    this.popupNewServicePopupVisible = false;
  }


  loadDataForm(e){
    
    this.formStageProperties.instance = e.component;
    this.formStageProperties.instance.updateData(this.stagePropesrtiesItems);
  }


}