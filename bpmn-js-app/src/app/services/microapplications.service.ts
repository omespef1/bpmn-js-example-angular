import { Injectable } from '@angular/core';
import { Action } from '../models/action-result-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root'
})
export class MicroApplicationsService {

  constructor(private http:HttpClient,private  configService:ConfigService) { }


  getById(id:any,token:any){
    const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    return  this.http.get<Action<any>>(`${this.configService.config.apiMicroapplications}/MicroApplications/${id}`,{headers:httpHeaders});
  }

}
