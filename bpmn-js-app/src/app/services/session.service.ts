import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from './../../../src/environments/environment';
import { AuthModel, Session } from '../models/user.model';

const GUID_SESSION = "461c9664-85cb-40d8-9eea-24247227b2e8";
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public SessionObservable: BehaviorSubject<Session> = new BehaviorSubject<Session>(null);
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  
  get session(): Session {    
    const data = localStorage.getItem(GUID_SESSION);
    if (data && data !== '') {
      return JSON.parse(atob(data));
    }
    return null;
  }
  
  set session(value: Session) {
    if (value) {        
      const data = btoa(JSON.stringify(value));
      localStorage.setItem(GUID_SESSION, data);
      this.SessionObservable.next(value);
    }
  }

  constructor() { }

  clean() {
    if (this.session) {
      localStorage.removeItem(GUID_SESSION);
      this.SessionObservable.next(null);
    }
  }

  setAuthFromLocalStorage(auth: AuthModel): boolean {
    if (auth && auth.accessToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  
}
