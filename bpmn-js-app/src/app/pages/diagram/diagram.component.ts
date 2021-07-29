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

/**
 * You may include a different variant of BpmnJS:
 *
 * bpmn-viewer  - displays BPMN diagrams without the ability
 *                to navigate them
 * bpmn-modeler - bootstraps a full-fledged BPMN editor
 */
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';

import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';
import { Stage } from 'src/app/models/bpm/stage';
import { DxSelectBoxComponent } from 'devextreme-angular';
import { SessionService } from 'src/app/services/session.service';
import { ConfigService } from 'src/app/services/config.service';
import { WorkflowService } from '../../services/workflow.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls:['./diagram.component.css']
})
export class DiagramComponent implements AfterContentInit, OnChanges, OnDestroy,OnInit {
  stagePropesrtiesItems: Stage = new Stage();
  @ViewChild('dropDownBoxWorflowList', { static: false }) dropDownBoxWorflowList: DxSelectBoxComponent;
  title = 'bpmn-js-angular';
  importError?: Error;
  closeButtonOptions: any;
  openButtonOptions: any;
  closeStageFlowButton: any;
  setStageFlowButton: any;
  flowListpopupVisible = false;
  flowStagePropertiesVisible = false;
  workflowSelected: any = {};
  workflowList: any[] = [];
  workflowListData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  isGridBoxOpened: boolean;
  gridDataSource: any;
  gridColumns: any = ['FLU_NOMB'];
  priorityItems = [{ text: 'Alta', id: 'A' }, { text: 'Media', id: 'M' }, { text: 'Baja', id: 'B' }];
  calcItems = [{ text: 'Generación etapa', id: 'G' }, { text: 'Final Calendario', id: 'C' }]
  calendarItems = [{ text: 'Normal', id: 'J' }, { text: 'De días hábiles', id: 'H' }]
  items: any[] = [
    { location: 'before', widget: 'dxButton', options: { icon: 'plus', text: 'Nuevo' } },
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
    { location: 'before', widget: 'dxButton', options: { icon: 'save', text: 'Guardar', onClick: ()=>{

      this.saveXml();
    } } },
    { location: 'before', widget: 'dxButton', options: { icon: 'trash', text: 'Borrar' } },
    { location: 'before', widget: 'dxButton', options: { icon: 'fullscreen', text: 'Centrar' } },
    { location: 'before', widget: 'dxButton', options: { icon: 'remove', text: 'Cancelar' } }

  ];



  // Component
  private bpmnJS: BpmnJS;
  @ViewChild('ref', { static: true }) private el: ElementRef;
  @Output() private importDone: EventEmitter<any> = new EventEmitter();

  @Input() private url: string;

  constructor(private http: HttpClient, private WorkflowService: WorkflowService, private session: SessionService, private configService: ConfigService) {
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


    this.closeButtonOptions = {
      text: "Cerrar",
      icon: 'remove',
      onClick: () => {
        this.flowListpopupVisible = false;
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
  }

  getWorkflowList() {
    this.WorkflowService.GetWorkFlowByCompany("102").subscribe(resp => {
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
    this.workflowSelected = e.data.value;
    this.dropDownBoxWorflowList.instance.close();
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

  saveXml() {
    this.bpmnJS.saveXML().then((xml) => {
      console.log(xml);

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


}
