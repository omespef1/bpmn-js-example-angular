import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { ActionResult } from '../models/action-result-model';

const CONTROLLER = 'WF_FLUJO'
@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private http:HttpClient,private configService:ConfigService) { }

  GetWorkFlowByCompany(company:string){
  return  this.http.get<ActionResult<any[]>>(`${this.configService.config.apiRwfEditrUrl}/${CONTROLLER}?emp_codi=${company}`);
  }
}
