import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  error(message:string){
    notify(message,'error',5000);
  }
  success(message:string){
    notify({message:message,position:'top right'},'success',5000);
  }
}
