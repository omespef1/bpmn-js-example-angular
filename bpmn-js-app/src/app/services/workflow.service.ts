import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { ActionResult } from '../models/action-result-model';
import { Wf_Flujo } from '../models/bpm/Wf_Flujo';

const CONTROLLER = 'WF_FLUJO'
@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getWorkFlowByCompany(company: string) {
    return this.http.get<ActionResult<any[]>>(`${this.configService.config.apiRwfEditrUrl}/${CONTROLLER}?emp_codi=${company}`);
  }
  getWorkFlowById(company: number, id: number) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin", "*");


    return this.http.get<ActionResult<string>>(`${this.configService.config.apiRwfEditrUrl}/${CONTROLLER}/GetById?companyCode=${company}&consecutive=${id}`, { headers });
  }

  setWorkFlow(xml: any) {

    console.log('xml es');
    console.log(xml);
    let data = { xml: xml.xml }
    return this.http.post<ActionResult<string>>(`${this.configService.config.apiRwfEditrUrl}/${CONTROLLER}`, data);
  }




}
