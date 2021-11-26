import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthModel, ThemeAssets, Session } from '../../models/user.model';
import { SessionService } from '../../services/session.service';
import { SecurityService } from '../../services/security.service';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styles: [],
})
export class RedirectComponent implements OnInit {
  themeAssets:ThemeAssets;
  auth:AuthModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sessionService: SessionService,
    private alertService: AlertService,
    private router: Router,
    private securityService: SecurityService
  ) {

    
  }

  ngOnInit(): void {
    
    this.sessionService.clean();
    this.activatedRoute.queryParams.subscribe(async (params) => {
      if (!params.token || !params.companyCode) {
        this.alertService.error('Los parametros son inválidos');
        return;
      }

      this.auth = {accessToken : params.token,refreshToken:params.token};
      this.sessionService.setAuthFromLocalStorage(this.auth);

      this.securityService.getSession(params.token).subscribe(
        (response) => {
          if (!response.isSuccessful) {
            this.alertService.error('Acceso no autorizado');
            return;
          }
          
          let session:Session = response.result;
          session.token = params.token;
          session.selectedCompany.code = params.companyCode;
          console.log(params.companyCode);
          this.sessionService.session = response.result;              
          this.changeStyle();
          
          this.router.navigateByUrl('browser');
        },
        (err) => {
          this.alertService.error('Acceso no autorizado');
        }
      );
    });
  }

  changeStyle() {
    this.themeAssets = this.sessionService.session.selectedCompany.theme.assets;
    document.documentElement.style.setProperty('--headerColor', this.themeAssets.gridHeaderColor);
    document.documentElement.style.setProperty('--gridColor', this.themeAssets.gridHeaderTextColor);
    document.documentElement.style.setProperty('--popUpColor', this.themeAssets.primaryColor);
    document.documentElement.style.setProperty('--popUpTextColor', this.themeAssets.primaryTextColor);
    document.documentElement.style.setProperty('--buttonColor', this.themeAssets.primaryButtonColor);
    document.documentElement.style.setProperty('--buttonTextColor', this.themeAssets.primaryButtonTextColor);
  }
}
