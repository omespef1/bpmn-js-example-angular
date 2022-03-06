import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActionResult } from '../models/action-result-model';
import { ConfigService } from './config.service';
const CONTROLLER = 'WF_ROLES'
@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http:HttpClient,private configService:ConfigService) { }


  getWfRoles(company: number) {
    return this.http.get<ActionResult<any[]>>(`${this.configService.config.apiRwfEdinvUrl}/${CONTROLLER}?emp_codi=${company}`);
  }
}
