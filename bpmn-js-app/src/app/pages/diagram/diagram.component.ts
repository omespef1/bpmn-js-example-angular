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
  Input
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

import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';
import { Wf_Etapa } from 'src/app/models/bpm/Wf_Etapa';
import { DxDropDownBoxComponent, DxSelectBoxComponent } from 'devextreme-angular';
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
import { element } from 'protractor';
const UPLOAD_URL ="Upload"
@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements AfterContentInit, OnChanges, OnDestroy, OnInit {
  fileAllowedExtensions: string[] = [];
  SESSION_ID =  uuidv4();
  stagePropesrtiesItems: Wf_Etapa = new Wf_Etapa();
  @ViewChild('dropDownBoxWorflowList', { static: false }) dropDownBoxWorflowList: DxSelectBoxComponent;
  elementSelected: any;
  title = 'bpmn-js-angular';
  importError?: Error;
  closeButtonOptions: any;
  webServiceButton:any;
  processButton:any;
  methodButton:any;
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
  setNewSubprocessButton: any;
  setNewAssignamentButton: any;
  setNewDestinyMailUser: any;
  popupActionsVisibleButton:any;
  newFrmasStage: any;
  propertyFrmasStage: any;
  deleteFrmasStage: any;
  setNewDelegateButton: any;
  setNewFollowButton: any;
  setNewDetalFormButton: any;
  flowListpopupVisible = false;
  flowStagePropertiesVisible = false;
  actionStageSelected:Wf_Accio = new Wf_Accio();
  newWorkFlowWindowVisible = false;
  newSubprocessVisible = false;
  newAssignamentStageVisible = false;
  assignamentDestinyMailPopupVisible = false;
  actionsPopupVisible=false;
  newDelegatedStageVisible = false;
  newFollowStageVisible = false;
  newFormDetailStageVisible = false;
  workflowSelected: Wf_Flujo = new Wf_Flujo();
  newForkFlowFormtTemp: Wf_Formu = new Wf_Formu();
  newForkFlowForm: Wf_Formu = new Wf_Formu();
  newSubprocess: SubProcess = new SubProcess();
  @ViewChild("dropDownBoxfbd32edd") dropdownNewWorkFlowFormu: DxDropDownBoxComponent;
  @ViewChild("dropDownBoxaec8150b") dropdownNewSubProcess: DxDropDownBoxComponent;
  @ViewChild("dropDownBoxfbd32e41") dropdownWfWebse: DxDropDownBoxComponent;

  wfFormuList: Wf_Formu[] = [];
  workflowList: any[] = [];
  subProcessFlowList: Wf_Flujo[] = [];
  workflowListData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  isGridBoxOpened: boolean;
  gridDataSource: any;
  gridColumns: any = ['FLU_NOMB'];
  priorityItems = [{ text: 'Alta', id: 'A' }, { text: 'Media', id: 'M' }, { text: 'Baja', id: 'B' }];
  wfPlantItems: Wf_Plant[] = [];
  wfPlantDetailsItems: Wf_Dplan[] = [];
  usertsToAsign: Wf_Aptos[] = [];
  delegateToAsign: Wf_Deleg[] = [];
  destinyToAsing: Wf_Desti[] = [];
  followToAsign: Wf_Usegu[] = [];
  formsDetailToAsig: FormDetail[] = [];
  wfFormasList: Wf_Frmas[] = [];
  calcItems = [{ text: 'Generación etapa', id: 'G' }, { text: 'Final Calendario', id: 'C' }]
  actionsStateWorkDone = [{ text: 'Completada', id: 'C' }, { text: 'En curso', id: 'E' }]
  calendarItems = [{ text: 'Normal', id: 'J' }, { text: 'De días hábiles', id: 'H' }]
  executorsItems = [{ text: 'Usuarios/Roles', id: 'U' }, { text: 'Iniciador del proceso', id: 'I' },
  { text: 'Tarea Anterior', id: 'N' }, { text: 'Plantilla', id: 'P' }];
  yesNoItems = [{ id: 'S', text: 'Si' }, { id: 'N', text: 'No' }];

  rolesCompany: any[] = [];
  usersCompany: any[] = [];
  wfWebseItems: Wf_Webse[] = [];
  WfMwebsItems: Wf_Mwebs[] = [];
  wfPmetoItems: Wf_Pmeto[] = [];
  criteryExecutors = [{ text: 'Aleatorio', id: 'A' },
  { text: 'Secuencial', id: 'S' },
  { text: 'Balanceo de Cargas', id: 'B' },
  { text: 'Seleccionable en Ejecucion', id: 'E' },
  { text: 'Todos los Usuarios', id: 'T' },
  ];


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
    private wfPmetoService: WfpmetoService) {
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
      // user modeled something or
      // performed an undo/redo operation
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
      this.stagePropesrtiesItems = new Wf_Etapa();
      if (event.element.WF_ETAPA == null || event.element.WF_ETAPA == undefined) {
        event.element.WF_ETAPA = new Wf_Etapa();
      }
      if (event.element.type != "bpmn:Process") {
        debugger;
        switch (event.element.type) {
          case 'bpmn:SequenceFlow':
            break;
          case 'bpmn:SubProcess':
            this.newSubprocessVisible = true;
            break;
          case 'bpmn:StartEvent':

            if (event.element.businessObject.eventDefinitions != undefined &&
              event.element.businessObject.eventDefinitions.length > 0) {
              if (event.element.businessObject.eventDefinitions[0].type == "bpmn:MessageEventDefinition" || event.element.businessObject.eventDefinitions[0].$type) {

                this.loadPropertiesPanel(event);
                break;
              }

            }
            else {
              break;
            }
            break;
          case '"bpmn:EndEvent':
            break;
          default:
            this.loadPropertiesPanel(event)
            break;
        }





      }
      // the element was changed by the user
    });

    this.eventBus = this.bpmnJS.get('eventBus');

    this.eventBus.on('shape.added', (event) => {
      event.element.WF_ETAPA = new Wf_Etapa();
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
        debugger;
        this.flowStagePropertiesVisible = false;
        this.elementSelected.element.WF_ETAPA = this.stagePropesrtiesItems;
        this.stagePropesrtiesItems = new Wf_Etapa();
      }

    };
    this.setNewWorkFlowButton = {
      text: "Aceptar",
      icon: 'check',
      onClick: () => {
        this.newWorkFlowWindowVisible = false;
        this.workflowSelected.FOR_CONT =  this.newForkFlowFormtTemp.FOR_CONT;
        this.getFormFrmas();
        this.getFlowsSubprocess();
        this.setFormWorkFlow();
      }

    };
    this.setNewSubprocessButton = {
      text: "Aceptar",
      icon: 'check',
      onClick: () => {
        debugger;
        this.newSubprocessVisible = false;
        this.elementSelected.element.WF_ETAPA = new Wf_Etapa();
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

  }

  loadPropertiesPanel(event) {
    console.log(event);
    this.flowStagePropertiesVisible = true;
    this.stagePropesrtiesItems = event.element.WF_ETAPA;
    this.elementSelected = event;
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
    await this.configService.getAppConfig();
    this.getWorkflowList();
    this.GetWfFormu();
    this.getUsertsToAsign();
    this.getWfPlant();
    
    this.getWfWebseByCompany();
    // this.initEmpty();

  }
  GetWfFormu() {
    this.formsService.getwfFormuList().subscribe(resp => {
      if (resp.IsSuccessful && resp.Result != null) {
        this.wfFormuList = resp.Result;
      }
    })
  }
  getWorkflowList() {
    this.WorkflowService.getWorkFlowByCompany("102").subscribe(resp => {
      if (resp.IsSuccessful) {
        this.workflowList = resp.Result;

        this.workflowListData.next(this.workflowList);
      }
    })

  }

  getWfPlant() {
    this.wfPlantService.getByCompany(102).subscribe(resp => {
      if (resp.IsSuccessful && resp.Result != null) {

        this.wfPlantItems = resp.Result;
        this.getWfPlantDetails();

      }
    })
  }

  
  getWfPlantDetails() {
    this.wfPlantService.getAllDetails(102).subscribe(resp => {
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

    this.rolesService.getWfRoles(102).subscribe(rolesResp => {
      if (rolesResp.IsSuccessful && rolesResp != null) {

        this.rolesCompany = rolesResp.Result;

        this.usersService.getUsers(102).subscribe(usersResp => {
          if (usersResp.IsSuccessful && usersResp != null) {

            this.usersCompany = usersResp.Result;
            if (this.rolesCompany != null && this.rolesCompany.length > 0) {
              this.rolesCompany.forEach(role => {
                this.usertsToAsign.push({
                  EMP_CODI: 102, ETA_CONT: this.stagePropesrtiesItems.ETA_CONT, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, APT_DEST: role.ROL_CODI,
                  APT_TDES: 'R', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12'
                });
                this.delegateToAsign.push({
                  EMP_CODI: 102, ETA_CONT: this.stagePropesrtiesItems.ETA_CONT, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, DEL_DEST: role.ROL_CODI,
                  DEL_TDES: 'R', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12'
                });
                this.followToAsign.push({
                  EMP_CODI: 102, ETA_CONT: this.stagePropesrtiesItems.ETA_CONT, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, USE_DEST: role.ROL_CODI,
                  USE_TDES: 'R', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12'
                });
                this.destinyToAsing.push({
                  EMP_CODI: 102, ETA_CONT: this.stagePropesrtiesItems.ETA_CONT, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, DES_DEST: role.ROL_CODI,
                  DES_TDES: 'R', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12', DPL_CONT: 0, PLA_CONT: 0
                });
              });

            }
            if (this.usersCompany != null && this.usersCompany.length > 0) {
              this.usersCompany.forEach(user => {
                this.usertsToAsign.push({
                  EMP_CODI: 102, ETA_CONT: this.stagePropesrtiesItems.ETA_CONT, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, APT_DEST: user.USU_CODI,
                  APT_TDES: 'U', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12'
                })
                this.delegateToAsign.push({
                  EMP_CODI: 102, ETA_CONT: this.stagePropesrtiesItems.ETA_CONT, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, DEL_DEST: user.USU_CODI,
                  DEL_TDES: 'U', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12'
                });
                this.followToAsign.push({
                  EMP_CODI: 102, ETA_CONT: this.stagePropesrtiesItems.ETA_CONT, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, USE_DEST: user.USU_CODI,
                  USE_TDES: 'U', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12'
                });

                this.destinyToAsing.push({
                  EMP_CODI: 102, ETA_CONT: this.stagePropesrtiesItems.ETA_CONT, FLU_CONT: this.stagePropesrtiesItems.FLU_CONT, DES_DEST: user.USU_CODI,
                  DES_TDES: 'U', AUD_ESTA: 'A', AUD_UFAC: new Date(), AUD_USUA: 'Seven12', DPL_CONT: 0, PLA_CONT: 0
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
    debugger;
    var filter = this.workflowSelected.FLU_CONT == undefined ? -1 : this.workflowSelected.FLU_CONT;
    this.WorkflowService.getForSubprocess(102, filter).subscribe(resp => {
      if (resp.IsSuccessful && resp.Result != null)
        this.subProcessFlowList = resp.Result;
    })
  }
  showModalWorkflowList() {
    this.flowListpopupVisible = true;
  }

  setFlowSelected(e) {
    debugger;

    if (e.data != null) {

      this.flowListpopupVisible = false;
      this.loadFlow(e.data.FLU_CONT);
    }


  }

  loadFlow(id) {
    this.WorkflowService.getWorkFlowById(102, id).subscribe(resp => {
      if (resp.IsSuccessful && resp.Result != null) {
        // this.workflowSelected = resp.Result;
        this.buildXml(resp.Result);
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
      this.WorkflowService.setWorkFlow(xml, rootElement).subscribe(resp => {
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
    debugger;
    if (e == "N")
      this.stagePropesrtiesItems.ETA_INIC == "N"
    else
      this.stagePropesrtiesItems.ETA_INIC == "S"

  }

  init(e) {
    console.log(e);
    debugger;
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


  addNewProcess(id: number, isExecutable: boolean) {

    // Agregar elemento bpmn:process con id  nuevo basado en companyCode y consecutivo
  }

  addStartEvent(id: string, name: string) {

    // Homólogo Seven => WF_ETAPA

    // Agregar elemento startEvent, atributo id basado en companyCode y consecutivo, atributo name es el nombre de la etapa

    // nodo hijo bpmn:outgoing define en punto de unión saliente, debe tener el id del sequenceflow que lo conecta


    //   nodo hijo bpmn:outgoing es la ruta saliente
  }

  addUserTask() {

    // Homólogo Seven => WF_ETAPA
    // Agregar el elemento bpmn:userTask

    // nodo hijo bpmn:incoming en punto de unión entrante, debe tener el id del sequenceflow que lo conecta


    //   nodo hijo bpmn:outgoing es la ruta saliente, debe tener el id del sequenceflow que lo conecta



    // Atributi id autogenerado 

    // Atributo name es el nombre de la etapa
  }


  addExclusiveDoor() {
    // Homólogo Seven => WF_ETAPA
    // Agregar elemento exclusiveGateway

    // nodo hijo bpmn:incoming en puntos de unión entrante, debe tener el id del sequenceflow que lo conecta


    //   nodo hijo bpmn:outgoing es puntos de unión saliente, debe tener el id del sequenceflow que lo conecta


  }


  addSequenceFlow() {
    // Homólogo Seven => WF_RUTAS


    // Elemento bpmn:sequenceFlow

    //Atributo id => Autogenerado, pero debe ser referenciado en los puntos conecttores

    // sourceRef => Tarea desde la cual sale la flecha
    // targetRef => Tarea destino de la flecha


  }

  addEndEvent() {
    // Homólogo Seven => WF_ETAPA
    //Atributo id => Autogenerado, pero debe ser referenciado en los targetRef o sourceRef de las flechas
  }

  addDiagram() {

    //  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    // Elementp bpmndi:BPMNDiagram

    // id= Autogenerado

  }
  addBpmPlane() {

    // Elementp bpmndi:BPMNPlane
  }

  readStages() {

    // Debe leer todas las etapas con eta_cont > 0
  }



  setFormWorkFlowTemp(e) {
    this.newForkFlowFormtTemp = e.data;
  
    this.dropdownNewWorkFlowFormu.instance.close();
  }

  addNewExecutor(e) {
    this.stagePropesrtiesItems.WF_APTOS.push(e.data);
    this.newAssignamentStageVisible = false;
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
    console.log(this.emptyXml);
  }

  initEmpty() {
    this.bpmnJS.importXML(this.emptyXml);
    const rootElement = this.bpmnJS.get('canvas').getRootElement();
    rootElement.id = this.SESSION_ID;
  }

  setNewAssignament() {

  }

  isTemplate(data) {
    debugger;
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
  // this.eventBus.on('shape.added', (event) => {
  //   event.element.WF_ETAPA = new Wf_Etapa();
  // });

  buildNewStage(event) {
    event.element.WF_ETAPA = new Wf_Etapa();
    event.element.WF_ETAPA.ETA_ASUN = this.buildAsun(event);
    event.element.businessObject.name = event.element.WF_ETAPA.ETA_ASUN;


  }

  buildAsun(event) {
    debugger;
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
    this.wfWebseService.getByCompany(102).subscribe(resp => {
      if (resp.IsSuccessful && resp.Result != null) {
        this.wfWebseItems = resp.Result;

      }
    })
  }


  setWfWebse(e: any) {
    console.log(e.data);
    this.stagePropesrtiesItems.WEB_CONT = e.data.WEB_CONT;
    this.stagePropesrtiesItems.MWE_CONT = e.data.MWE_CONT;
    this.getWfPmetoByService(102,this.stagePropesrtiesItems.WEB_CONT,this.stagePropesrtiesItems.MWE_CONT);
    this.wfPmetoService.getByService(102,this.stagePropesrtiesItems.WEB_CONT = e.data.WEB_CONT,this.stagePropesrtiesItems.MWE_CONT = e.data.MWE_CONT).subscribe(resp=>{
      debugger;
      if(resp.IsSuccessful && resp.Result!=null){
  // Llenar un wf_pswet con un wf_pmeto
         resp.Result.forEach(element => {
            let wfpswet:Wf_Pswet =  {
            EMP_CODI : element.EMP_CODI,
            ETA_CONT : this.stagePropesrtiesItems.ETA_CONT,
            FLU_CONT : this.stagePropesrtiesItems.FLU_CONT,
            FRM_CODI :"",
            MWE_CONT :element.MWE_CONT,
            PLA_CONT : 0,
            PME_CONT : element.PME_CONT,
            PME_PADR :0,
            PME_SECU : element.PME_SECU,
            PSW_CAMP : "",
            PSW_CONT : 0,
            PSW_NCAM : "",
            PSW_VALO :"",
            WEB_CONT : this.stagePropesrtiesItems.WEB_CONT,
            PSW_TABL :"",
            AUD_ESTA : "A",
            AUD_UFAC : new Date(),
            DGR_CONT : 0,
            CAM_CODI :"",
            AUD_USUA : "",
            PSW_TVAL : "C",
            DPL_CONT:0
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
    // inicio con mensaje
    /// tarea de usuario
  }

  tabActionsVisibility(){


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
  getWfPmetoByService(emp_codi: number, web_cont: number, mwe_cont: number) {
    this.wfPmetoService.getByService(emp_codi, web_cont, mwe_cont).subscribe(resp => {

      if (resp.IsSuccessful && resp.Result != null) {
        this.wfPmetoItems = resp.Result;
      }
    })
  }

  test(options){
  //   if (options.parentType == 'dataRow') {  
  //     if (options.dataField == 'name') {  
  //         options.editorElement.dxTextBox('instance').option('onValueChanged', function (e) {  
  //             options.component.getCellElement(options.row.rowIndex, "name1").find(".dx-textbox").dxTextBox("instance").option("value", "new value");  
  //         });  
  //     }  
  // }  
  debugger;
    if (options.dataField === 'PSW_VALO' && options.parentType === 'dataRow') {
      options.component.getCellElement(options.row.rowIndex, "PSW_TVAL")      
    }

  }
  calculatedDataType(rowData){
      return this.wfPmetoItems.filter(t=> t.EMP_CODI && 102 && t.WEB_CONT ==   this.stagePropesrtiesItems.WEB_CONT && t.MWE_CONT ==   this.stagePropesrtiesItems.MWE_CONT)[0].PME_TIPO;
  }
  calculatedClass(rowData){
    return this.wfPmetoItems.filter(t=> t.EMP_CODI && 102 && t.WEB_CONT ==   this.stagePropesrtiesItems.WEB_CONT && t.MWE_CONT ==   this.stagePropesrtiesItems.MWE_CONT)[0].PME_CLAS;
}

calculatedSecu(rowData){
  return this.wfPmetoItems.filter(t=> t.EMP_CODI && 102 && t.WEB_CONT ==   this.stagePropesrtiesItems.WEB_CONT && t.MWE_CONT ==   this.stagePropesrtiesItems.MWE_CONT)[0].PME_SECU;
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
  debugger;
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
  debugger;
  rowData.DPL_CONT = null;
  (<any>this).defaultSetCellValue(rowData, value);
}

getFilteredPlantItems(options) {
  return {
      store: this.wfPlantDetailsItems,
      filter: options.data ? ["PLA_CONT", "=", options.data.PLA_CONT] : null
  };
}

initNewRowActions(e){

}

openPopUpActions(e){  
  this.actionStageSelected = e.data;
  this.actionsPopupVisible=true;
}

onEditorPreparingGridActionsDetail(e) {
  if(e.parentType === "dataRow" && e.dataField === "DPL_CONT") {
      e.editorOptions.disabled = (typeof e.row.data.StateID !== "number");
  }
}

}