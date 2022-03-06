import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { ActionResult } from '../models/action-result-model';
const CONTROLLER = 'WF_FRMAS'
@Injectable({
  providedIn: 'root'
})
export class StageFrmasService {

  constructor(private http:HttpClient,private configService:ConfigService) { }


  getWfFrmas(for_cont: number) {
    return this.http.get<ActionResult<any[]>>(`${this.configService.config.apiRwfEdinvUrl}/${CONTROLLER}?for_cont=${for_cont}`);
  }
}
