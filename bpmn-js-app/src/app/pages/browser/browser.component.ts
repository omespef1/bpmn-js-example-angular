import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { threadId } from 'worker_threads';
import { WfSeguiService } from '../../services/wfsegui.service';
import { Session } from '../../models/user.model';
import { identifierModuleUrl } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Wf_Flujo } from '../../models/bpm/Wf_Flujo';
import { WfEtapaService } from '../../services/wfetapa.service';
import { Wf_Etapa } from '../../models/bpm/Wf_Etapa';
import { GnMenusService } from '../../services/gnmenus.service';
import { Wf_Fetap } from 'src/app/models/bpm/Wf_Fetap';
import { forEach } from 'jszip';
import { MicroApplicationsService } from '../../services/microapplications.service';
import { Observable } from 'rxjs/internal/Observable';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { IBrowserForm } from '../../interfaces/broser-form';
import { SessionService } from '../../services/session.service';
import { ResourceParameter } from '../../models/resource-parameter';
import { AlertService } from '../../services/alert.service';
import { Wf_Segui } from '../../models/bpm/Wf_Segui';
import { DxAccordionComponent, DxPopupComponent, DxTreeViewComponent } from 'devextreme-angular';
import DevExpress from 'devextreme';
export type GUID = string & { isGuid: true };
export class Tab {
  id: number;

  text: string;

  icon: string;

  content: string;
}


@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {
  // @ViewChild("popUpDelegatesTree", { static: false }) popUpDelegatesTree: DxPopupComponent;

  @ViewChild('treeView', { static: false }) treeView: DxTreeViewComponent;
  sending = false;
  listForms: IBrowserForm[] = [];
  segui: Wf_Segui = new Wf_Segui();
  mode = "grid";
  followUp: any;
  stage: Wf_Etapa;
  tracingPrev: Wf_Segui;
  wfSeguiGridSource: any[] = [];
  buttonInitProcess: any;
  buttonStartTask: any;
  buttonUpdateTask: any;
  buttonDetailProcess: any;
  buttonDelegateProcess: any;
  popUpLastCommentsVisible: boolean;
  popUpDelegateVisible: boolean;
  popUpEditorVisible:boolean;
  historicTracing: any;
  buttonSearch: any;
  sourceRoles:  any[] = [
    {
        "id": "1",
        "text": "ADMINISTRADOR",
        "parentId": "0",
        "type": "R"
    },
    {
        "id": "R09062015080417",
        "text": "admin",
        "parentId": "0",
        "type": "R"
    },
    {
        "id": "R20032015102817",
        "text": "ADMIN",
        "parentId": "0",
        "type": "R"
    },
    {
        "id": "R20072020225930",
        "text": "admin",
        "parentId": "0",
        "type": "R"
    },
    {
        "id": "1030601621",
        "text": "LUISRG",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "111010",
        "text": "SEVEN12 SEVEN12",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "1600",
        "text": "MILENA CASTRO",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "444",
        "text": "CUARTARAQUEL",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "4448",
        "text": "MFKLDSHFKDJSF",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "447",
        "text": "RAQUELN",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "458",
        "text": "LILO LILO",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "555",
        "text": "QUINTARAQUEL",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "66",
        "text": "SEGUNDARAQUEL",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "777",
        "text": "JJIJIJIJ",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "891222",
        "text": "ELYANY POS",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "adrianaj",
        "text": "ADRIANA JAIME",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "ADRIANAS",
        "text": "ADRIANA SALAS",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "AnaCM",
        "text": "ANA CASTAÑEDA",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "CapacitacionS",
        "text": "USUARIO CAPACITACION",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "carlosg",
        "text": "CARLOS GONZALEZ",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "CARMENL",
        "text": "CARMEN LOPREZ",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "carom",
        "text": "CAROLINA M",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "CATALINA",
        "text": "CATALINA SAAVEDRA",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "cgonzalez",
        "text": "CARLOS GONZALEZ",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "CLAUDIAS",
        "text": "CONSULTOR - CLAUDIA SANCHEZ",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "cristinag",
        "text": "CRISTINA GOMEZ",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "delaq",
        "text": "ALEXANDER DE LA CUADRA VASQUEZ",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "dianars",
        "text": "DIANA MARCELA ROMERO SANCHEZ",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "DINAS",
        "text": "DINA GIOVANNA SUAREZ",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "EDDIEL",
        "text": "EDDIE LOPEZ",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "erikap",
        "text": "ERIKA PARDO",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "fabiom",
        "text": "FABIO ALEXANDER MORALES",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "gonzalop",
        "text": "GONZALO PINZON",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "HECTORLM",
        "text": "HECTOR LOZANO MORENO",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "jackelineq",
        "text": "JACKELINE QUINTERO",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "JorgeS",
        "text": "JORGE ALEXANDER SANABRIA",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "JOTA",
        "text": "FRANCISCO JAVIER RODRIGUEZ",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "julianv",
        "text": "JULIAN VALLEJO",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "leonardoc",
        "text": "LEONARDO CLAVIJO",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "leonardot",
        "text": "LEONARDO  TOBON",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "LUISRG",
        "text": "LUIS FELIPE RAMIREZ G.",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "marthat",
        "text": "MARTHA TOVAR",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "meryp",
        "text": "MERY PIÑEROS",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "NIDIAH",
        "text": "NIDIA  HERRERA CAMACHO",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "SEVEN12",
        "text": "Usuario Admon Seven",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "sevendoc",
        "text": "SEVEN PRUEBAS WF",
        "parentId": "1",
        "type": "U"
    },
    {
        "id": "yider",
        "text": "YIDER MENDOZA",
        "parentId": "1",
        "type": "U"
    }
];
  @ViewChild('accordion', { static: false }) accordion: DxAccordionComponent;
  buttonBack: any;
  tabs: Tab[] = [
    {
      id: 0,
      text: 'Recibido',
      icon: 'box',
      content: 'User tab content',
    },
    {
      id: 1,
      text: 'A enviar',
      icon: 'email',
      content: 'Comment tab content',
    },
    {
      id: 2,
      text: 'Docunmentos del caso',
      icon: 'doc',
      content: 'Find tab content',
    },
    {
      id: 3,
      text: 'Seguimiento',
      icon: 'find',
      content: 'Find tab content',
    },
    {
      id: 4,
      text: 'Instructivo',
      icon: 'verticalaligncenter',
      content: 'Find tab content',
    },
    {
      id: 5,
      text: 'Propiedades',
      icon: 'preferences',
      content: 'Find tab content',
    },
    {
      id: 6,
      text: 'Descripción del caso',
      icon: 'columnchooser',
      content: 'Find tab content',
    },

  ];
  dimensions: string;

  constructor(private wfSeguiService: WfSeguiService, private wfEtapaService: WfEtapaService, private gnMenusService: GnMenusService,
    private microApplicationService: MicroApplicationsService, private sanitizer: DomSanitizer, private sessionService: SessionService, private alertService: AlertService, private changes:ChangeDetectorRef) {


    this.buttonInitProcess = {

      text: 'Iniciar proceso',
      icon: 'increaseindent',
      onClick: () => {


      }
    }
    this.buttonBack = {

      text: 'Atrás',
      icon: 'revert',
      onClick: () => {

        this.mode = "grid"
      }
    }


    this.buttonStartTask = {

      text: 'Ejecutar tarea',
      icon: 'exportselected',
      onClick: () => {


      }
    }

    this.buttonUpdateTask = {

      text: 'Actualizar tarea',
      icon: 'refresh',
      onClick: () => {
        this.getAllWfSegui();
      }
    }


    this.buttonDetailProcess = {

      text: 'Detalle proceso',
      icon: 'folder',
      onclick: () => {


      }
    }

    // this.buttonDelegateProcess = {

    //   text: 'Delegar',
    //   icon: 'user',
    //   onclick: () => {


    //   }
    // }
    this.popUpLastCommentsVisible = false;
    this.popUpDelegateVisible = false;
    this.popUpEditorVisible=false;

  }



  ngOnInit(): void {
    this.loadDimensions();
    this.loadSesion();
    this.getAllWfSegui();
  }


  loadSesion() {

  }
  getAllWfSegui() {

    this.wfSeguiService.GetAllByUser(this.sessionService.session.accountCode).subscribe(resp => {
      if (resp != undefined && resp.IsSuccessful) {
        this.wfSeguiGridSource = resp.Result;
      }
    })
  }

  goModeForm(e) {
    this.mode = 'form';
    this.followUp = e.data;
    this.getWfSegui(this.followUp.CAS_CONT, this.followUp.SEG_CONT);
    this.getStageByflow();

  }


  getStageByflow() {

    this.wfEtapaService.getById(this.followUp.EMP_CODI, this.followUp.FLU_CONT, this.followUp.ETA_CONT).subscribe(resp => {

      if (resp.IsSuccessful && resp != null) {
        this.stage = resp.Result;
        debugger;
       
        this.loadForms(this.stage);
      }
    })
  }

  getTracingPrev() {

    this.wfSeguiService.getById(this.segui.EMP_CODI, this.segui.CAS_CONT, this.segui.SEG_CONT == 0 ? 0 : this.segui.SEG_CONT - 1).subscribe(resp => {

      if (resp.IsSuccessful && resp != null) {
        this.tracingPrev = resp.Result;
      }
    })
  }


  loadForms(stage: Wf_Etapa) {

    this.accordion.instance.beginUpdate();
    stage.WF_FETAP.forEach(form => {

      this.gnMenusService.getByProgramCode(form.FRM_CODI).subscribe(resp => {
        if (resp != null && resp.IsSuccessful) {

          let main = resp.Result;
          console.log(main);
          if ("42CD282C-6889-4F77-9718-BA84BCD6CDB0" != undefined) {
            this.microApplicationService.getById("42CD282C-6889-4F77-9718-BA84BCD6CDB0" as GUID, this.sessionService.session.token).subscribe(microapp => {
              if (microapp != null && microapp.isSuccessful) {
                let formData: IBrowserForm = new IBrowserForm();
                formData.formCode = form.FRM_CODI;
                formData.formName = main[0].MEN_NOMB;
                formData.url = new BehaviorSubject<SafeResourceUrl>('');
                formData.urlObserver$ = formData.url.asObservable();
                let url = `${microapp.result.url}?`;
                if (microapp.result.parameters != null) {
                  let i = 0;
                  for (const parameter of microapp.result.parameters) {
                    url += `${i === 0 ? '' : '&'}${parameter.code}=${this.GetGlobalVariables(parameter)}`;
                    i += 1;
                  }
                  formData.url.next(this.sanitizer.bypassSecurityTrustResourceUrl(url));
                }
                this.listForms.push(formData);
                this.accordion.instance.endUpdate();
                this.accordion.instance.repaint();
                this.accordion.instance.collapseItem(0);

              }
            })
          }

        }
      })


    });

  }

  loadDimensions() {

    this.dimensions = `width: 100%; height:${this.gridHeight()}px;border:none`;
  }

  gridHeight = () => {
    return Math.round(window.innerHeight / 1);
  }



  GetGlobalVariables(param: ResourceParameter) {
    if (param.type == 0) {
      return param.value;
    } else {
      switch (param.code) {
        case "token":
          return this.sessionService.session.token;
        case "companyCode":
          return this.sessionService.session.selectedCompany.code;
      }
    }
  }

  getWfSegui(cas_cont: number, seg_cont: number) {

    this.wfSeguiService.getById(this.sessionService.session.selectedCompany.code, cas_cont, seg_cont).subscribe(resp => {
      if (resp != null && resp.IsSuccessful) {
        debugger;
        this.segui = resp.Result;
        this.getTracingPrev();
        this.getHistoricTracing(this.segui.CAS_CONT, this.sessionService.session.selectedCompany.code);
        this.getRolesForTree();
      }
    })
  }

  showPopUpDelegatesTree() {
    console.log('test');
    // this.popUpDelegatesTree.instance.show();
     this.popUpDelegateVisible = true;
  }
  getHistoricTracing(cas_cont: number, companyCode: number) {
    this.wfSeguiService.getAllByCase(companyCode, cas_cont).subscribe(resp => {
      if (resp != null && resp.IsSuccessful) {
        this.historicTracing = resp.Result;
      }
    })
  }

  showPopuopTracing() {
    this.popUpLastCommentsVisible = true;

  }

  getRolesForTree() {
   
    this.wfSeguiService.getRolesForTRee(this.sessionService.session.selectedCompany.code, this.followUp.FLU_CONT, this.segui.ETA_CONT).subscribe(resp => {
      if (resp != null && resp.IsSuccessful) {
      
        // this.treeView.instance.beginUpdate();
        this.sourceRoles = resp.Result;
        console.log(resp.Result);
      //   this.treeView.instance.endUpdate();
      //  this.treeView.instance.getDataSource();
       this.changes.detectChanges();
        // this.showPopUpDelegatesTree();
      }
    })

  }



  hidePopUpDelegatesTree() {

    this.popUpDelegateVisible = false;
  }

  showPopUpEditor(){
    this.popUpEditorVisible=true;
  }


  nextTracing(){
    this.sending=true;
    this.wfSeguiService.nextTracing(this.segui,this.sessionService.session.token).subscribe(resp => {
      this.sending=false;
      if (resp != null && resp.IsSuccessful) {
        this.alertService.successSweet('Seguimiento terminado!','Perfecto!');
        this.mode='grid';
        this.getAllWfSegui();
      }
      else {

        this.alertService.errorSweet(resp.ErrorMessage,'Error');
      }
    })
  }


 

}
