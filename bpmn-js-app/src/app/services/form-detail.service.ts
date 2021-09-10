import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActionResult } from '../models/action-result-model';
import { ConfigService } from './config.service';
const CONTROLLER = 'WF_DEFOR'
@Injectable({
  providedIn: 'root'
})
export class FormDetailService {

  constructor(private http:HttpClient,private configService:ConfigService) { }

  GetDetailFormList(for_cont:number){
    return  this.http.get<ActionResult<any[]>>(`${this.configService.config.apiRwfEditrUrl}/${CONTROLLER}?for_cont=${for_cont}`);
  }

}
