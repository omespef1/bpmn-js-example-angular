import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActionResult } from '../models/action-result-model';
import { ConfigService } from './config.service';
import { Wf_Webse } from '../models/bpm/Wf_Webse';
const CONTROLLER = 'WF_WEBSE'
@Injectable({
  providedIn: 'root'
})
export class WfWebseService {

  constructor(private http:HttpClient,private configService:ConfigService) { }


  getByCompany(company: number) {
    return this.http.get<ActionResult<Wf_Webse[]>>(`${this.configService.config.apiRwfEdinvUrl}/${CONTROLLER}?emp_codi=${company}`);
  }
}
