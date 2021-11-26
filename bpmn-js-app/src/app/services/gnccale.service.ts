import { Injectable } from '@angular/core';
import { ActionResult } from '../models/action-result-model';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Wf_Plant } from '../models/bpm/Wf_Plant';
import { Wf_Dplan } from '../models/bpm/Wf_Dplan';
const CONTROLLER = "GN_CCALE";
@Injectable({
  providedIn: 'root'
})
export class GnCcaleService {

  constructor(private http:HttpClient,private  configService:ConfigService) { }


  Get(){
    return  this.http.get<ActionResult<any[]>>(`${this.configService.config.apiRwfEditrUrl}/${CONTROLLER}`);
  }

}
