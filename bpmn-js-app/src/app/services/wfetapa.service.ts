import { Injectable } from '@angular/core';
import { ActionResult } from '../models/action-result-model';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Wf_Plant } from '../models/bpm/Wf_Plant';
import { Wf_Dplan } from '../models/bpm/Wf_Dplan';
import { Wf_Etapa } from '../models/bpm/Wf_Etapa';
const CONTROLLER = "WF_ETAPA";
@Injectable({
  providedIn: 'root'
})
export class WfEtapaService {

  constructor(private http:HttpClient,private  configService:ConfigService) { }


  getById(companyCode:number, flu_cont:number, eta_cont:number){
    return  this.http.get<ActionResult<Wf_Etapa>>(`${this.configService.config.apiRwfEdinvUrl}/${CONTROLLER}/GetById?emp_codi=${companyCode}&flu_cont=${flu_cont}&eta_cont=${eta_cont}`);
  }

}
