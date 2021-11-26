import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';
import Swal from 'sweetalert2'

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

  successSweet(message:string,title:string){

    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    })
  }

  errorSweet(message:string, title:string){
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }
}
