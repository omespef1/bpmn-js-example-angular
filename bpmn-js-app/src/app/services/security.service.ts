import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor(private configService: ConfigService, private http: HttpClient) {}

  getSession() {
    return this.http.get<any>(
      `${this.configService.config.apiSecurityUrl}/user`
    );
  }
}
