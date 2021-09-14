import { Injectable } from '@angular/core';
import { ActionResult } from '../models/action-result-model';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Wf_Plant } from '../models/bpm/Wf_Plant';
const CONTROLLER = "WF_PLANT";
@Injectable({
  providedIn: 'root'
})
export class WfPlantService {

  constructor(private http:HttpClient,private  configService:ConfigService) { }


  getByCompany(companyCode:number){
    return  this.http.get<ActionResult<Wf_Plant[]>>(`${this.configService.config.apiRwfEditrUrl}/${CONTROLLER}?emp_codi=${companyCode}`);
  }
}
