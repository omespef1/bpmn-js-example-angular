import { Injectable } from '@angular/core';
import { ActionResult } from '../models/action-result-model';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Wf_Plant } from '../models/bpm/Wf_Plant';
import { Wf_Dplan } from '../models/bpm/Wf_Dplan';
const CONTROLLER = "WF_PLANT";
@Injectable({
  providedIn: 'root'
})
export class WfPlantService {

  constructor(private http:HttpClient,private  configService:ConfigService) { }


  getByCompany(companyCode:number){
    return  this.http.get<ActionResult<Wf_Plant[]>>(`${this.configService.config.apiRwfEdinvUrl}/${CONTROLLER}?emp_codi=${companyCode}`);
  }

  getAllDetails(companyCode:number){
    return  this.http.get<ActionResult<Wf_Dplan[]>>(`${this.configService.config.apiRwfEdinvUrl}/WF_DPLAN?emp_codi=${companyCode}`);
  }
}
