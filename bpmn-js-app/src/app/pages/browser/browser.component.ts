import { ChangeDetectorRef, Component, OnInit, ViewChild, enableProdMode } from '@angular/core';
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
import { element } from 'protractor';
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
  rejecting=false;
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
  buttonClosePopUpDelegate:any;
  buttonSetDelegate:any;
  buttonDelegateProcess: any;
  popUpLastCommentsVisible: boolean;
  popUpDelegateVisible: boolean;
  popUpEditorVisible:boolean;
  historicTracing: any;
  buttonSearch: any;
  sourceRoles:  any[] = [];
   
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


      this.buttonClosePopUpDelegate = {
        text: "Cerrar",
        icon: 'remove',
        onClick: () => {
          this.popUpDelegateVisible = false;
        }
      };
      this.buttonSetDelegate = {
        text: "Delegar",
        icon: 'remove',
        onClick: () => {
          this.popUpDelegateVisible = false;
        }
      };

      

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

  delegate(e){
    console.log(e);
    this.popUpDelegateVisible=false;
this.alertService.successSweet(`Delegado a ${e.itemData.text}`,'Perfecto!')
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

  invalidTracing(){
    this.rejecting=true;
    this.wfSeguiService.invalidTracing(this.segui,this.sessionService.session.token).subscribe(resp => {
      this.rejecting=false;
      if (resp != null && resp.IsSuccessful) {
        this.alertService.successSweet('Seguimiento devuelto!','Perfecto!');
        this.mode='grid';
        this.getAllWfSegui();
      }
      else {

        this.alertService.errorSweet(resp.ErrorMessage,'Error');
      }
    })
  }


 

}
