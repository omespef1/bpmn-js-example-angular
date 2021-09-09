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

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements AfterContentInit, OnChanges, OnDestroy, OnInit {
  stagePropesrtiesItems: Wf_Etapa = new Wf_Etapa();
  @ViewChild('dropDownBoxWorflowList', { static: false }) dropDownBoxWorflowList: DxSelectBoxComponent;
  title = 'bpmn-js-angular';
  importError?: Error;
  closeButtonOptions: any;
  closeButtonNewWorkFlowWindow: any;
  openButtonOptions: any;
  closeStageFlowButton: any;
  setStageFlowButton: any;
  setNewWorkFlowButton: any;
  flowListpopupVisible = false;
  flowStagePropertiesVisible = false;
  newWorkFlowWindowVisible = false;
  workflowSelected: Wf_Flujo = new Wf_Flujo();
  newForkFlowFormtTemp: Wf_Formu = new Wf_Formu();
  newForkFlowForm: Wf_Formu = new Wf_Formu();
  @ViewChild("dropDownBoxfbd32edd") dropdownNewWorkFlowFormu: DxDropDownBoxComponent;
  formsList: Wf_Formu[] = [];
  workflowList: any[] = [];
  workflowListData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  isGridBoxOpened: boolean;
  gridDataSource: any;
  gridColumns: any = ['FLU_NOMB'];
  priorityItems = [{ text: 'Alta', id: 'A' }, { text: 'Media', id: 'M' }, { text: 'Baja', id: 'B' }];
  calcItems = [{ text: 'Generación etapa', id: 'G' }, { text: 'Final Calendario', id: 'C' }]
  calendarItems = [{ text: 'Normal', id: 'J' }, { text: 'De días hábiles', id: 'H' }]
  emptyXml = `
  <?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<bpmn:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" id=\"Definitions_1\" targetNamespace=\"http://bpmn.io/schema/bpmn\"><bpmn:process id=\"Process_1\" isExecutable=\"false\" /><bpmndi:BPMNDiagram id=\"BPMNDiagram_1\"><bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Process_1\" /></bpmndi:BPMNDiagram></bpmn:definitions>`
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
        icon: 'folder', text: 'Propiedades Etapa', onClick: () => {
          this.flowStagePropertiesVisible = true;
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
    { location: 'before', widget: 'dxButton', options: { icon: 'trash', text: 'Borrar' } },
    { location: 'before', widget: 'dxButton', options: { icon: 'fullscreen', text: 'Centrar' } },
    { location: 'before', widget: 'dxButton', options: { icon: 'remove', text: 'Cancelar' } }

  ];



  // Component
  private bpmnJS: BpmnJS;
  @ViewChild('ref', { static: true }) private el: ElementRef;
  @Output() private importDone: EventEmitter<any> = new EventEmitter();

  @Input() private url: string;

  constructor(private http: HttpClient, private WorkflowService: WorkflowService, private session: SessionService, private configService: ConfigService,
    private formsService: FormService) {
    var customTranslateModule = {
      translate: ['value', customTranslate]
    };

    this.bpmnJS = new BpmnJS({
      additionalModules: [
        customTranslateModule
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
    });

    this.bpmnJS.on('element.changed', (event) => {
      console.log(event);
      const element = event.element;

      // the element was changed by the user
    });


    this.closeButtonOptions = {
      text: "Cerrar",
      icon: 'remove',
      onClick: () => {
        this.flowListpopupVisible = false;
      }
    };
    this.closeButtonNewWorkFlowWindow = {
      text: "Cerrar",
      icon: 'remove',
      onClick: () => {
        this.newWorkFlowWindowVisible = false;
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
      text: "Cancelar",
      icon: 'folder',
      onClick: () => {
        this.flowStagePropertiesVisible = false;
      }

    };
    this.setNewWorkFlowButton = {
      text: "Aceptar",
      icon: 'check',
      onClick: () => {
        this.newWorkFlowWindowVisible = false;
        this.setFormWorkFlow();
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

  async ngOnInit() {
    await this.configService.getAppConfig();
    this.getWorkflowList();
    this.GetFormList();
  }
  GetFormList() {
    this.formsService.GetFormsList().subscribe(resp => {
      if (resp.IsSuccessful && resp.Result != null) {
        this.formsList = resp.Result;
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

  showModalWorkflowList() {
    this.flowListpopupVisible = true;
  }

  setFlowSelected(e) {

    this.dropDownBoxWorflowList.instance.close();
    if (e.value != null) {
      debugger;
      this.flowListpopupVisible = false;
      this.loadFlow(e.value);
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

  validAndBuilXml() {
    this.importDiagram(`..Seven-builder.js`)
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
    this.bpmnJS.saveXML().then((xml) => {
      console.log(xml); 
      this.WorkflowService.setWorkFlow(xml).subscribe(resp=>{
        console.log(resp); 
        if(resp.Result!=null && resp.IsSuccessful){

          notify('Flujo creado correctamente','success',5000);
        }
      })
      // this.buildXml(this.workflowSelected);
    });

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
    // console.log(flow.FLU_CONT);



    let xml =  xmlData;
    // xml = `
    // <?xml version="1.0" encoding="UTF-8"?>n<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn"><bpmn:process id="Process_1" isExecutable="false"><bpmn:startEvent id="Event_0fq5yl3" name="Inicio con Mensaje"><bpmn:outgoing>Flow_0xwc8jx</bpmn:outgoing><bpmn:messageEventDefinition id="MessageEventDefinition_1ta4jx4" /></bpmn:startEvent><bpmn:userTask id="Activity_02g50yf" name="Tarea con plantilladdd"><bpmn:incoming>Flow_0xwc8jx</bpmn:incoming><bpmn:outgoing>Flow_134ve4r</bpmn:outgoing></bpmn:userTask><bpmn:exclusiveGateway id="Gateway_0att5xf" name="Compuerta Exclusiva"><bpmn:incoming>Flow_1urzg5x</bpmn:incoming><bpmn:outgoing>Flow_0reaiod</bpmn:outgoing><bpmn:outgoing>Flow_0jcovv9</bpmn:outgoing></bpmn:exclusiveGateway><bpmn:userTask id="Activity_0gyoelq" name="Tarea"><bpmn:incoming>Flow_0reaiod</bpmn:incoming><bpmn:outgoing>Flow_1unsjan</bpmn:outgoing></bpmn:userTask><bpmn:sequenceFlow id="Flow_0xwc8jx" sourceRef="Event_0fq5yl3" targetRef="Activity_02g50yf" /><bpmn:sequenceFlow id="Flow_0reaiod" name="Tarea" sourceRef="Gateway_0att5xf" targetRef="Activity_0gyoelq" /><bpmn:endEvent id="Event_1uce27t"><bpmn:incoming>Flow_0jcovv9</bpmn:incoming></bpmn:endEvent><bpmn:sequenceFlow id="Flow_0jcovv9" name="Final" sourceRef="Gateway_0att5xf" targetRef="Event_1uce27t" /><bpmn:sendTask id="Activity_1jeypal" name="tarea de envio"><bpmn:incoming>Flow_134ve4r</bpmn:incoming><bpmn:outgoing>Flow_1urzg5x</bpmn:outgoing><bpmn:outgoing>Flow_0yfo94m</bpmn:outgoing></bpmn:sendTask><bpmn:sequenceFlow id="Flow_134ve4r" sourceRef="Activity_02g50yf" targetRef="Activity_1jeypal" /><bpmn:sequenceFlow id="Flow_1urzg5x" sourceRef="Activity_1jeypal" targetRef="Gateway_0att5xf" /><bpmn:manualTask id="Activity_1mzgwns" name="tarea manual"><bpmn:incoming>Flow_1unsjan</bpmn:incoming><bpmn:outgoing>Flow_01ondrq</bpmn:outgoing></bpmn:manualTask><bpmn:businessRuleTask id="Activity_19g2j5h" name="tarea de logica de negocio"><bpmn:incoming>Flow_01ondrq</bpmn:incoming><bpmn:outgoing>Flow_1fjfppu</bpmn:outgoing></bpmn:businessRuleTask><bpmn:serviceTask id="Activity_0mqcoks" name="Tarea de servicio"><bpmn:incoming>Flow_1fjfppu</bpmn:incoming><bpmn:outgoing>Flow_09wg6kh</bpmn:outgoing></bpmn:serviceTask><bpmn:scriptTask id="Activity_1x7varc" name="tarea de script"><bpmn:incoming>Flow_09wg6kh</bpmn:incoming><bpmn:outgoing>Flow_01xo8r4</bpmn:outgoing></bpmn:scriptTask><bpmn:callActivity id="Activity_0cv2mrh" name="Actividad de llamada"><bpmn:incoming>Flow_01xo8r4</bpmn:incoming><bpmn:outgoing>Flow_0dozz9o</bpmn:outgoing></bpmn:callActivity><bpmn:subProcess id="Activity_1z0ab36" name="subproceso colapsado"><bpmn:incoming>Flow_0dozz9o</bpmn:incoming><bpmn:outgoing>Flow_1xlwyq0</bpmn:outgoing></bpmn:subProcess><bpmn:subProcess id="Activity_0es9wer"><bpmn:incoming>Flow_1xlwyq0</bpmn:incoming><bpmn:outgoing>Flow_06mqfnv</bpmn:outgoing></bpmn:subProcess><bpmn:sequenceFlow id="Flow_1unsjan" sourceRef="Activity_0gyoelq" targetRef="Activity_1mzgwns" /><bpmn:sequenceFlow id="Flow_01ondrq" sourceRef="Activity_1mzgwns" targetRef="Activity_19g2j5h" /><bpmn:sequenceFlow id="Flow_1fjfppu" sourceRef="Activity_19g2j5h" targetRef="Activity_0mqcoks" /><bpmn:sequenceFlow id="Flow_09wg6kh" sourceRef="Activity_0mqcoks" targetRef="Activity_1x7varc" /><bpmn:sequenceFlow id="Flow_01xo8r4" sourceRef="Activity_1x7varc" targetRef="Activity_0cv2mrh" /><bpmn:sequenceFlow id="Flow_0dozz9o" sourceRef="Activity_0cv2mrh" targetRef="Activity_1z0ab36" /><bpmn:sequenceFlow id="Flow_1xlwyq0" sourceRef="Activity_1z0ab36" targetRef="Activity_0es9wer" /><bpmn:endEvent id="Event_0gtq5s0"><bpmn:incoming>Flow_06mqfnv</bpmn:incoming></bpmn:endEvent><bpmn:sequenceFlow id="Flow_06mqfnv" sourceRef="Activity_0es9wer" targetRef="Event_0gtq5s0" /><bpmn:receiveTask id="Activity_0flb613" name="tarea de recibir"><bpmn:incoming>Flow_0yfo94m</bpmn:incoming></bpmn:receiveTask><bpmn:sequenceFlow id="Flow_0yfo94m" sourceRef="Activity_1jeypal" targetRef="Activity_0flb613" /><bpmn:startEvent id="Event_1kysgo4" name="Inicio normal" /><bpmn:endEvent id="Event_1ejvtxj"><bpmn:messageEventDefinition id="MessageEventDefinition_0h1g03s" /></bpmn:endEvent><bpmn:intermediateThrowEvent id="Event_0kit0iw" name="evento intermedio" /><bpmn:startEvent id="Event_0ojmjoj" name="inicio temporizador"><bpmn:timerEventDefinition id="TimerEventDefinition_015syot" /></bpmn:startEvent></bpmn:process><bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1"><bpmndi:BPMNEdge id="Flow_1urzg5x_di" bpmnElement="Flow_1urzg5x"><di:waypoint x="620" y="20" /><di:waypoint x="700" y="20" /><di:waypoint x="700" y="195" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_134ve4r_di" bpmnElement="Flow_134ve4r"><di:waypoint x="430" y="20" /><di:waypoint x="520" y="20" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_0jcovv9_di" bpmnElement="Flow_0jcovv9"><di:waypoint x="725" y="220" /><di:waypoint x="852" y="220" /><bpmndi:BPMNLabel><dc:Bounds x="776" y="202" width="25" height="14" /></bpmndi:BPMNLabel></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_0reaiod_di" bpmnElement="Flow_0reaiod"><di:waypoint x="700" y="245" /><di:waypoint x="700" y="320" /><di:waypoint x="820" y="320" /><bpmndi:BPMNLabel><dc:Bounds x="702" y="280" width="27" height="14" /></bpmndi:BPMNLabel></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_0xwc8jx_di" bpmnElement="Flow_0xwc8jx"><di:waypoint x="138" y="70" /><di:waypoint x="204" y="70" /><di:waypoint x="204" y="20" /><di:waypoint x="330" y="20" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1unsjan_di" bpmnElement="Flow_1unsjan"><di:waypoint x="820" y="320" /><di:waypoint x="650" y="320" /><di:waypoint x="650" y="520" /><di:waypoint x="480" y="520" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_01ondrq_di" bpmnElement="Flow_01ondrq"><di:waypoint x="480" y="520" /><di:waypoint x="610" y="520" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1fjfppu_di" bpmnElement="Flow_1fjfppu"><di:waypoint x="710" y="490" /><di:waypoint x="850" y="490" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_09wg6kh_di" bpmnElement="Flow_09wg6kh"><di:waypoint x="950" y="490" /><di:waypoint x="980" y="490" /><di:waypoint x="980" y="480" /><di:waypoint x="1010" y="480" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_01xo8r4_di" bpmnElement="Flow_01xo8r4"><di:waypoint x="1110" y="480" /><di:waypoint x="1145" y="480" /><di:waypoint x="1145" y="500" /><di:waypoint x="1180" y="500" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_0dozz9o_di" bpmnElement="Flow_0dozz9o"><di:waypoint x="1230" y="520" /><di:waypoint x="1230" y="560" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1xlwyq0_di" bpmnElement="Flow_1xlwyq0"><di:waypoint x="1180" y="600" /><di:waypoint x="960" y="600" /><di:waypoint x="960" y="690" /><di:waypoint x="740" y="690" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_06mqfnv_di" bpmnElement="Flow_06mqfnv"><di:waypoint x="530" y="730" /><di:waypoint x="530" y="792" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_0yfo94m_di" bpmnElement="Flow_0yfo94m"><di:waypoint x="520" y="20" /><di:waypoint x="485" y="20" /><di:waypoint x="485" y="230" /><di:waypoint x="450" y="230" /></bpmndi:BPMNEdge><bpmndi:BPMNShape id="Event_0fxi4te_di" bpmnElement="Event_0fq5yl3"><dc:Bounds x="102" y="52" width="36" height="36" /><bpmndi:BPMNLabel><dc:Bounds x="97" y="95" width="47" height="27" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0wa4ugf_di" bpmnElement="Activity_02g50yf"><dc:Bounds x="330" y="-20" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Gateway_1d616qo_di" bpmnElement="Gateway_0att5xf" isMarkerVisible="true"><dc:Bounds x="675" y="195" width="50" height="50" /><bpmndi:BPMNLabel><dc:Bounds x="593" y="210" width="55" height="27" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0cg6a7w_di" bpmnElement="Activity_0gyoelq"><dc:Bounds x="820" y="280" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Event_1uce27t_di" bpmnElement="Event_1uce27t"><dc:Bounds x="852" y="202" width="36" height="36" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_02oxfzx_di" bpmnElement="Activity_1jeypal"><dc:Bounds x="520" y="-20" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_1ho7qqw_di" bpmnElement="Activity_19g2j5h"><dc:Bounds x="610" y="450" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0w3fo6k_di" bpmnElement="Activity_0mqcoks"><dc:Bounds x="850" y="450" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_005vkv5_di" bpmnElement="Activity_1x7varc"><dc:Bounds x="1010" y="440" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0xlr43g_di" bpmnElement="Activity_0cv2mrh"><dc:Bounds x="1180" y="440" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0hskw24_di" bpmnElement="Activity_1mzgwns"><dc:Bounds x="380" y="480" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Event_0gtq5s0_di" bpmnElement="Event_0gtq5s0"><dc:Bounds x="512" y="792" width="36" height="36" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_1pug404_di" bpmnElement="Activity_0flb613"><dc:Bounds x="350" y="190" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Event_1kysgo4_di" bpmnElement="Event_1kysgo4"><dc:Bounds x="82" y="142" width="36" height="36" /><bpmndi:BPMNLabel><dc:Bounds x="69" y="185" width="63" height="14" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNShape id="Event_1avfzcq_di" bpmnElement="Event_1ejvtxj"><dc:Bounds x="802" y="32" width="36" height="36" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Event_0qregbm_di" bpmnElement="Event_0kit0iw"><dc:Bounds x="52" y="372" width="36" height="36" /><bpmndi:BPMNLabel><dc:Bounds x="26" y="415" width="88" height="14" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNShape id="Event_1lq39qh_di" bpmnElement="Event_0ojmjoj"><dc:Bounds x="82" y="232" width="36" height="36" /><bpmndi:BPMNLabel><dc:Bounds x="68" y="275" width="65" height="27" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_1h5e3oi_di" bpmnElement="Activity_0es9wer" isExpanded="true"><dc:Bounds x="300" y="650" width="440" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0uqyz8q_di" bpmnElement="Activity_1z0ab36"><dc:Bounds x="1180" y="560" width="100" height="80" /></bpmndi:BPMNShape></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn:definitions>
    // `

//     xml = `
//     <?xml version="1.0" encoding="UTF-8"?>n
// <bpmn:definitions
// 	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
// 	xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
// 	xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
// 	xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
// 	xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
// 	<bpmn:process id="Process_1" isExecutable="false">
// 		<bpmn:startEvent id="Event_1n1nqko">
// 			<bpmn:outgoing>Flow_1nfyjkl</bpmn:outgoing>
// 		</bpmn:startEvent>
// 		<bpmn:task id="Activity_0i5gvkj" name="Tarea">
// 			<bpmn:incoming>Flow_1nfyjkl</bpmn:incoming>
// 			<bpmn:outgoing>Flow_1rtkm9h</bpmn:outgoing>
// 		</bpmn:task>
// 		<bpmn:sequenceFlow id="Flow_1nfyjkl" sourceRef="Event_1n1nqko" targetRef="Activity_0i5gvkj" />
// 		<bpmn:task id="Activity_01wyiwi" name="Tarea">
// 			<bpmn:incoming>Flow_1rtkm9h</bpmn:incoming>
// 			<bpmn:outgoing>Flow_1rrzfxx</bpmn:outgoing>
// 		</bpmn:task>
// 		<bpmn:sequenceFlow id="Flow_1rtkm9h" sourceRef="Activity_0i5gvkj" targetRef="Activity_01wyiwi" />
// 		<bpmn:task id="Activity_155pio6" name="Tarea">
// 			<bpmn:incoming>Flow_1rrzfxx</bpmn:incoming>
// 			<bpmn:outgoing>Flow_1l1zpak</bpmn:outgoing>
// 		</bpmn:task>
// 		<bpmn:sequenceFlow id="Flow_1rrzfxx" sourceRef="Activity_01wyiwi" targetRef="Activity_155pio6" />
// 		<bpmn:sequenceFlow id="Flow_1l1zpak" sourceRef="Activity_155pio6" targetRef="Activity_1wtye74" />
// 		<bpmn:sendTask id="Activity_1wtye74" name="Tareas de Email">
// 			<bpmn:incoming>Flow_1l1zpak</bpmn:incoming>
// 			<bpmn:outgoing>Flow_0kuhirz</bpmn:outgoing>
// 		</bpmn:sendTask>
// 		<bpmn:sequenceFlow id="Flow_0kuhirz" sourceRef="Activity_1wtye74" targetRef="Activity_0a0j0k0" />
// 		<bpmn:scriptTask id="Activity_0a0j0k0" name="Tarea de Script">
// 			<bpmn:incoming>Flow_0kuhirz</bpmn:incoming>
// 			<bpmn:outgoing>Flow_08dwzne</bpmn:outgoing>
// 		</bpmn:scriptTask>
// 		<bpmn:intermediateThrowEvent id="Event_14qlyii">
// 			<bpmn:incoming>Flow_08dwzne</bpmn:incoming>
// 		</bpmn:intermediateThrowEvent>
// 		<bpmn:sequenceFlow id="Flow_08dwzne" sourceRef="Activity_0a0j0k0" targetRef="Event_14qlyii" />
// 	</bpmn:process>
// 	<bpmndi:BPMNDiagram id="BPMNDiagram_1">
// 		<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
// 			<bpmndi:BPMNEdge id="Flow_1nfyjkl_di" bpmnElement="Flow_1nfyjkl">
// 				<di:waypoint x="298" y="250" />
// 				<di:waypoint x="324" y="250" />
// 				<di:waypoint x="324" y="330" />
// 				<di:waypoint x="350" y="330" />
// 			</bpmndi:BPMNEdge>
// 			<bpmndi:BPMNEdge id="Flow_1rtkm9h_di" bpmnElement="Flow_1rtkm9h">
// 				<di:waypoint x="450" y="330" />
// 				<di:waypoint x="480" y="330" />
// 				<di:waypoint x="480" y="250" />
// 				<di:waypoint x="510" y="250" />
// 			</bpmndi:BPMNEdge>
// 			<bpmndi:BPMNEdge id="Flow_1rrzfxx_di" bpmnElement="Flow_1rrzfxx">
// 				<di:waypoint x="610" y="250" />
// 				<di:waypoint x="670" y="250" />
// 			</bpmndi:BPMNEdge>
// 			<bpmndi:BPMNEdge id="Flow_1l1zpak_di" bpmnElement="Flow_1l1zpak">
// 				<di:waypoint x="770" y="250" />
// 				<di:waypoint x="800" y="250" />
// 				<di:waypoint x="800" y="330" />
// 				<di:waypoint x="830" y="330" />
// 			</bpmndi:BPMNEdge>
// 			<bpmndi:BPMNEdge id="Flow_0kuhirz_di" bpmnElement="Flow_0kuhirz">
// 				<di:waypoint x="930" y="330" />
// 				<di:waypoint x="960" y="330" />
// 				<di:waypoint x="960" y="480" />
// 				<di:waypoint x="990" y="480" />
// 			</bpmndi:BPMNEdge>
// 			<bpmndi:BPMNEdge id="Flow_08dwzne_di" bpmnElement="Flow_08dwzne">
// 				<di:waypoint x="1090" y="480" />
// 				<di:waypoint x="1171" y="480" />
// 				<di:waypoint x="1171" y="330" />
// 				<di:waypoint x="1252" y="330" />
// 			</bpmndi:BPMNEdge>
// 			<bpmndi:BPMNShape id="Event_1n1nqko_di" bpmnElement="Event_1n1nqko">
// 				<dc:Bounds x="262" y="232" width="36" height="36" />
// 			</bpmndi:BPMNShape>
// 			<bpmndi:BPMNShape id="Activity_01wyiwi_di" bpmnElement="Activity_01wyiwi">
// 				<dc:Bounds x="510" y="210" width="100" height="80" />
// 			</bpmndi:BPMNShape>
// 			<bpmndi:BPMNShape id="Activity_155pio6_di" bpmnElement="Activity_155pio6">
// 				<dc:Bounds x="670" y="210" width="100" height="80" />
// 			</bpmndi:BPMNShape>
// 			<bpmndi:BPMNShape id="Activity_0i5gvkj_di" bpmnElement="Activity_0i5gvkj">
// 				<dc:Bounds x="350" y="290" width="100" height="80" />
// 			</bpmndi:BPMNShape>
// 			<bpmndi:BPMNShape id="Activity_149dlln_di" bpmnElement="Activity_1wtye74">
// 				<dc:Bounds x="830" y="290" width="100" height="80" />
// 			</bpmndi:BPMNShape>
// 			<bpmndi:BPMNShape id="Activity_01iu0ot_di" bpmnElement="Activity_0a0j0k0">
// 				<dc:Bounds x="990" y="440" width="100" height="80" />
// 			</bpmndi:BPMNShape>
// 			<bpmndi:BPMNShape id="Event_14qlyii_di" bpmnElement="Event_14qlyii">
// 				<dc:Bounds x="1252" y="312" width="36" height="36" />
// 			</bpmndi:BPMNShape>
// 		</bpmndi:BPMNPlane>
// 	</bpmndi:BPMNDiagram>
// </bpmn:definitions>

//     `

    // const xml2 =`
    // <?xml version="1.0" encoding="UTF-8"?>n<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn"><bpmn:process id="Process_1" isExecutable="false"><bpmn:startEvent id="Event_019kean" name="Inicio"><bpmn:outgoing>Flow_0156jq8</bpmn:outgoing></bpmn:startEvent><bpmn:userTask id="Activity_1xs9kl0" name="Tarea"><bpmn:incoming>Flow_0156jq8</bpmn:incoming></bpmn:userTask><bpmn:sequenceFlow id="Flow_0156jq8" sourceRef="Event_019kean" targetRef="Activity_1xs9kl0" /></bpmn:process><bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1"><bpmndi:BPMNEdge id="Flow_0156jq8_di" bpmnElement="Flow_0156jq8"><di:waypoint x="-502" y="-130" /><di:waypoint x="-426" y="-130" /><di:waypoint x="-426" y="-40" /><di:waypoint x="-350" y="-40" /></bpmndi:BPMNEdge><bpmndi:BPMNShape id="Event_019kean_di" bpmnElement="Event_019kean"><dc:Bounds x="-538" y="-148" width="36" height="36" /><bpmndi:BPMNLabel><dc:Bounds x="-533" y="-105" width="26" height="14" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_1azlbxi_di" bpmnElement="Activity_1xs9kl0"><dc:Bounds x="-350" y="-80" width="100" height="80" /></bpmndi:BPMNShape></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn:definitions>
    // `;

    // const xml3 = `
    // <?xml version="1.0" encoding="UTF-8"?>n<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn"><bpmn:process id="Process_1" isExecutable="false"><bpmn:startEvent id="Event_1ng7y7n" name="Inicio"><bpmn:outgoing>Flow_1aml575</bpmn:outgoing></bpmn:startEvent><bpmn:userTask id="Activity_1yyv2wr" name="Tarea"><bpmn:incoming>Flow_1aml575</bpmn:incoming><bpmn:outgoing>Flow_05qvigi</bpmn:outgoing></bpmn:userTask><bpmn:userTask id="Activity_0ki8mwu" name="Tarea"><bpmn:incoming>Flow_05qvigi</bpmn:incoming><bpmn:outgoing>Flow_1s93fym</bpmn:outgoing></bpmn:userTask><bpmn:userTask id="Activity_19nn969" name="Tarea"><bpmn:incoming>Flow_1s93fym</bpmn:incoming><bpmn:outgoing>Flow_18xtmfy</bpmn:outgoing></bpmn:userTask><bpmn:sendTask id="Activity_0tvy9aa" name="Tarea de email"><bpmn:incoming>Flow_18xtmfy</bpmn:incoming><bpmn:outgoing>Flow_0uh3ar0</bpmn:outgoing></bpmn:sendTask><bpmn:serviceTask id="Activity_0v54g0h" name="Tarea de servicio"><bpmn:incoming>Flow_0uh3ar0</bpmn:incoming><bpmn:outgoing>Flow_10s3fe6</bpmn:outgoing></bpmn:serviceTask><bpmn:endEvent id="Event_0x5oci9"><bpmn:incoming>Flow_10s3fe6</bpmn:incoming></bpmn:endEvent><bpmn:sequenceFlow id="Flow_1aml575" sourceRef="Event_1ng7y7n" targetRef="Activity_1yyv2wr" /><bpmn:sequenceFlow id="Flow_05qvigi" sourceRef="Activity_1yyv2wr" targetRef="Activity_0ki8mwu" /><bpmn:sequenceFlow id="Flow_1s93fym" sourceRef="Activity_0ki8mwu" targetRef="Activity_19nn969" /><bpmn:sequenceFlow id="Flow_18xtmfy" sourceRef="Activity_19nn969" targetRef="Activity_0tvy9aa" /><bpmn:sequenceFlow id="Flow_0uh3ar0" sourceRef="Activity_0tvy9aa" targetRef="Activity_0v54g0h" /><bpmn:sequenceFlow id="Flow_10s3fe6" sourceRef="Activity_0v54g0h" targetRef="Event_0x5oci9" /></bpmn:process><bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1"><bpmndi:BPMNEdge id="Flow_1aml575_di" bpmnElement="Flow_1aml575"><di:waypoint x="-622" y="0" /><di:waypoint x="-490" y="0" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_05qvigi_di" bpmnElement="Flow_05qvigi"><di:waypoint x="-390" y="0" /><di:waypoint x="-300" y="0" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1s93fym_di" bpmnElement="Flow_1s93fym"><di:waypoint x="-200" y="0" /><di:waypoint x="-120" y="0" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_18xtmfy_di" bpmnElement="Flow_18xtmfy"><di:waypoint x="-20" y="0" /><di:waypoint x="70" y="0" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_0uh3ar0_di" bpmnElement="Flow_0uh3ar0"><di:waypoint x="170" y="0" /><di:waypoint x="220" y="0" /><di:waypoint x="220" y="110" /><di:waypoint x="270" y="110" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_10s3fe6_di" bpmnElement="Flow_10s3fe6"><di:waypoint x="370" y="110" /><di:waypoint x="496" y="110" /><di:waypoint x="496" y="0" /><di:waypoint x="622" y="0" /></bpmndi:BPMNEdge><bpmndi:BPMNShape id="Event_1ng7y7n_di" bpmnElement="Event_1ng7y7n"><dc:Bounds x="-658" y="-18" width="36" height="36" /><bpmndi:BPMNLabel><dc:Bounds x="-653" y="25" width="26" height="14" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0912286_di" bpmnElement="Activity_1yyv2wr"><dc:Bounds x="-490" y="-40" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0dtlnvv_di" bpmnElement="Activity_0ki8mwu"><dc:Bounds x="-300" y="-40" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_13heuvw_di" bpmnElement="Activity_19nn969"><dc:Bounds x="-120" y="-40" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_1npa16m_di" bpmnElement="Activity_0tvy9aa"><dc:Bounds x="70" y="-40" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_1jyuhps_di" bpmnElement="Activity_0v54g0h"><dc:Bounds x="270" y="70" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Event_0x5oci9_di" bpmnElement="Event_0x5oci9"><dc:Bounds x="622" y="-18" width="36" height="36" /></bpmndi:BPMNShape></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn:definitions>
    // `

    // if(flow.FLU_CONT == 225127){
    //   this.bpmnJS.importXML(xml2);
    //   return;
    // }

    // if(flow.FLU_CONT == 224127){
    console.log(xml);
    this.bpmnJS.importXML(xml);
    return;
    // }
    // if(flow.FLU_CONT == 228127){
    //   this.bpmnJS.importXML(xml3)
    // }
    // this.bpmnJS.importXML(xmlStr);





    // debugger;
    //     const {
    //       rootElement: definitions
    //     } = await moddle.fromXML(xmlStr);

    //     let id = `${flow.EMP_CODI}_${flow.FLU_CONT}` ;
    //     // update id attribute
    //     definitions.set('id', id);

    //     // Añado el elemento raiz
    //     const bpmnProcess = moddle.create('bpmn:Process', { id: `Process_${id}`});
    //     definitions.get('rootElements').push(bpmnProcess);    





    //     // xmlStrUpdated contains new id and the added process
    //     const {
    //       xml: xmlStrUpdated
    //     } =  await moddle.toXML(definitions);


    //     let initProcessOrigin = flow.WF_ETAPAS.filter(i=>i.GAB_CONT == -1 || i.GAB_CONT == -40)[0];
    //     if(initProcessOrigin!= null && initProcessOrigin!=undefined){
    //       const initProcessTarget = moddle.create('bpmn:startEvent', { id: `StartEvent_${id}`, name: initProcessOrigin.ETA_ASUN });     
    //       definitions.get('bpmn:Process').push(initProcessTarget);
    //     }

    //     console.log(xmlStrUpdated);
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
  setFormWorkFlow() {
    this.bpmnJS.importXML(this.emptyXml);
    this.newWorkFlowWindowVisible = false;
  }

}
