import { Injectable } from '@angular/core';
import { ActionResult } from '../models/action-result-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Wf_Plant } from '../models/bpm/Wf_Plant';
import { Wf_Dplan } from '../models/bpm/Wf_Dplan';
import { Wf_Segui } from '../models/bpm/Wf_Segui';
const CONTROLLER = "WF_SEGUI";
@Injectable({
  providedIn: 'root'
})
export class WfSeguiService {

  constructor(private http: HttpClient, private configService: ConfigService) { }


  GetAllByUser(user: string) {
    return this.http.get<ActionResult<any[]>>(`${this.configService.config.apiRwfEdinvUrl}/${CONTROLLER}?user=${user}`);
  }


  getById(companyCode: number, cas_cont: number, seg_cont: number) {

    return this.http.get<ActionResult<any>>(`${this.configService.config.apiRwfEdinvUrl}/${CONTROLLER}/getById?companyCode=${companyCode}&cas_cont=${cas_cont}&seg_cont=${seg_cont}`);
  }

  getAllByCase(companyCode: number, cas_cont: number) {

    return this.http.get<ActionResult<any>>(`${this.configService.config.apiRwfEdinvUrl}/${CONTROLLER}/GetAllByCase?companyCode=${companyCode}&cas_cont=${cas_cont}`);
  }



  nextTracing(tracing:Wf_Segui,token:string){
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ActionResult<any>>(`${this.configService.config.apiRwfEdinvUrl}/${CONTROLLER}/tracing`,tracing,{ headers:httpHeaders } );
  }

  invalidTracing(tracing:Wf_Segui,token:string){
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ActionResult<any>>(`${this.configService.config.apiRwfEdinvUrl}/${CONTROLLER}/reject`,tracing,{ headers:httpHeaders } );
  }
  
  getRolesForTRee(companyCode: number, flu_cont: number,eta_cont:number) {

    return this.http.get<ActionResult<any>>(`${this.configService.config.apiRwfEdinvUrl}/${CONTROLLER}/GetDelegatesForTree?companyCode=${companyCode}&flu_cont=${flu_cont}&eta_cont=${eta_cont}`);
  }
}
