import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { ActionResult } from '../models/action-result-model';
import { Wf_Flujo } from '../models/bpm/Wf_Flujo';
import { Diagram } from '../models/bpm/diagram';

const CONTROLLER = 'WF_FLUJO'
@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getWorkFlowByCompany(company: number) {
    return this.http.get<ActionResult<any[]>>(`${this.configService.config.apiRwfEditrUrl}/${CONTROLLER}?emp_codi=${company}`);
  }
  getWorkFlowById(company: number, id: number) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin", "*");


    return this.http.get<ActionResult<Diagram>>(`${this.configService.config.apiRwfEditrUrl}/${CONTROLLER}/GetById?companyCode=${company}&consecutive=${id}`, { headers });
  }


  getForSubprocess(company: number, id: number){
    return this.http.get<ActionResult<Wf_Flujo[]>>(`${this.configService.config.apiRwfEditrUrl}/${CONTROLLER}/GetSubprocessList?companyCode=${company}&consecutive=${id}`);
  }
  setWorkFlow(xml: any, diagram:any,workflow:Wf_Flujo) {
    
    console.log('xml es');
    console.log(xml);
    let data = { xml: xml.xml, diagram: diagram, flow:workflow }
    return this.http.post<ActionResult<string>>(`${this.configService.config.apiRwfEditrUrl}/${CONTROLLER}`, data);
  }






}
