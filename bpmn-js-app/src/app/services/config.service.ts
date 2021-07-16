import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../models/config';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  get config(): Config {
    const data = localStorage.getItem(`${environment.USERDATA_KEY}-${environment.appVersion}`);
    if (data && data !== '') {
      return JSON.parse(atob(data));
    }
    return new Config();
  }

  constructor(private http: HttpClient) { }

  clean() {
    localStorage.removeItem(`${environment.USERDATA_KEY}-${environment.appVersion}`);
  }

  async getAppConfig(): Promise<void> {
    try {
      const config = await this.http.get<Config>('assets/config.json').toPromise();
      if (config) {
        localStorage.setItem(`${environment.USERDATA_KEY}-${environment.appVersion}`, btoa(JSON.stringify(config)));
      }
    } catch (error) {
      console.error(`ConfigService: ${error}`);
    }
  }
}
