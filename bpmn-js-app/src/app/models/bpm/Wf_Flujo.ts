import { Wf_Etapa } from './Wf_Etapa';
import { Wf_Urepo } from './Wf_Urepo';
export class Wf_Flujo {
    constructor(companyCode: number) {
        this.WF_UREPO = [];
        this.EMP_CODI = companyCode;
        this.FLU_CONT = 0;
        this.FLU_NOMB = "";
        this.FOR_CONT = 0;
        this.FLU_DESC = "";
        this.GAB_CONT = 0;
        this.CCA_CONT = 0;
        this.FLU_DLIM = 0;
        this.FLU_HLIM = new Date();
        this.FLU_CLIM = "";
        this.FLU_DREC = 0;
        this.FLU_HREC = new Date();
        this.FLU_CREC = "";
        this.FLU_EDIT = "";
        this.FLU_USUE = "";
        this.FLU_EMAI = "S";
        this.AUD_ESTA = "A";
        this.AUD_USUA = "seven12";
        this.AUD_UFAC = new Date();
        this.FLU_OBJE = "";
        this.FLU_ALCA = "";
        this.FLU_RESP = "";
        this.FLU_COME = "";
        this.FLU_EMIN = "";
        this.FLU_VERS = "W";
        this.FLU_ESTA = "A";
        this.FLU_XMLD = "";
    }
    EMP_CODI: number;
    FLU_CONT: number;
    FLU_NOMB: string;
    FOR_CONT: number;
    FLU_DESC: string;
    GAB_CONT: number;
    CCA_CONT: number;
    FLU_DLIM: number;
    FLU_HLIM: Date;
    FLU_CLIM: string;
    FLU_DREC: number;
    FLU_HREC: Date;
    FLU_CREC: string;
    FLU_EDIT: string;
    FLU_USUE: string;
    FLU_EMAI: string;
    AUD_ESTA: string;
    AUD_USUA: string;
    AUD_UFAC: Date;
    FLU_OBJE: string;
    FLU_ALCA: string;
    FLU_RESP: string;
    FLU_COME: string;
    FLU_EMIN: string;
    FLU_VERS: string;
    FLU_ESTA: string;
    FLU_XMLD: string;
    WF_RUTAS: any[];
    WF_ETAPAS: Wf_Etapa[];
    WF_AREAS: any[];
    WF_MEFLU: any[];
    WF_RFLUP: any[];
    WF_UREPO: Wf_Urepo[];




}