import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActionResult } from '../models/action-result-model';
import { ConfigService } from './config.service';
const CONTROLLER = 'WF_FORMU'
@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http:HttpClient, private configService:ConfigService) { }



  getwfFormuList(){
    return  this.http.get<ActionResult<any[]>>(`${this.configService.config.apiRwfEditrUrl}/${CONTROLLER}?`);
  }
}
