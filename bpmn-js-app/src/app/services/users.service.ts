import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionResult } from '../models/action-result-model';
import { ConfigService } from './config.service';
const CONTROLLER = 'GN_USUAR'
@Injectable({
  providedIn: 'root'
})

export class UsersService {


  constructor(private http:HttpClient,private configService:ConfigService) { }


  getUsers(company: number) {
    return this.http.get<ActionResult<any[]>>(`${this.configService.config.apiRwfEdinvUrl}/${CONTROLLER}?emp_codi=${company}`);
  }
}
