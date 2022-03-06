import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActionResult } from '../models/action-result-model';
import { ConfigService } from './config.service';
import { Wf_Webse } from '../models/bpm/Wf_Webse';
import { Wf_Pmeto } from '../models/bpm/wfpmeto';
const CONTROLLER = 'WF_PMETO'
@Injectable({
  providedIn: 'root'
})
export class WfpmetoService {

  constructor(private http:HttpClient,private configService:ConfigService) { }


  getByService(emp_codi:number,web_cont:number,mwe_cont:number) {
    return this.http.get<ActionResult<Wf_Pmeto[]>>(`${this.configService.config.apiRwfEdinvUrl}/${CONTROLLER}?emp_codi=${emp_codi}&web_cont=${web_cont}&mwe_cont=${mwe_cont}`);
  }
}
