export class AuthModel {
  accessToken: string;
  refreshToken: string;

  // setAuth(auth: any) {
  //   this.accessToken = auth.accessToken;
  // }
}

export class Session extends AuthModel {
  id: number;
  username: string;
  accountCode: string;
  displayName: string;
  roleCode: string;
  selectedCompany: Company;
  password: string;
  fullname: string;
  email: string;
  pic: string;
  roles: number[];
  occupation: string;
  companyName: string;
  phone: string;
  address?: AddressModel;
  socialNetworks?: SocialNetworksModel;
  token?: string;
  // personal information
  firstname: string;
  lastname: string;
  website: string;
  // account information
  language: string;
  timeZone: string;
  communication: {
    email: boolean;
    sms: boolean;
    phone: boolean;
  };
  // email settings
  emailSettings: {
    emailNotification: boolean;
    sendCopyToPersonalEmail: boolean;
    activityRelatesEmail: {
      youHaveNewNotifications: boolean;
      youAreSentADirectMessage: boolean;
      someoneAddsYouAsAsAConnection: boolean;
      uponNewOrder: boolean;
      newMembershipApproval: boolean;
      memberRegistration: boolean;
    };
  };
}

export class Company {
  // Código de empresa
  code: string;
  // Nombre de la empresa
  name: string;
  // Tema asignado a la empresa
  theme: Theme;
}

export class Theme {
  id: string;
  code: number;
  name: string;
  assets: ThemeAssets = new ThemeAssets();
}

export class ThemeAssets {
  primaryColor:string;
  primaryTextColor :string;
  secundaryColor:string;
  secundaryTextColor :string;
  titleColor:string;
  titleTextColor:string;
  subTitleColor :string;
  labelColor :string;
  gridHeaderColor :string;
  gridHeaderTextColor :string;
  primaryButtonColor :string;
  primaryButtonTextColor :string;
  secundaryButtonColor :string;
  secundaryButtonTextColor :string;
}

export class AddressModel {
  addressLine: string;
  city: string;
  state: string;
  postCode: string;
}

export class SocialNetworksModel {
  linkedIn: string;
  facebook: string;
  twitter: string;
  instagram: string;
}
