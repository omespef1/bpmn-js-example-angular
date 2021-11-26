import { Wf_Etapa } from './Wf_Etapa';

export class Wf_Segui {


    constructor(){
        this.EMP_CODI=0;
        this.CAS_CONT=0;
        this.SEG_CONT=0;
        this.SEG_CONA=0;
        this.FLU_CONT=0;
        this.ETA_CONT=0;
        this.SEG_SUBJ="";
        this.SEG_PRIO="";
        this.SEG_FREC=new Date();
        this.SEG_HREC=new Date();
        this.SEG_FLIM=new Date();
        this.SEG_HLIM=new Date();
        this.SEG_DIAE=0;
        this.SEG_FCUL=new Date();
        this.SEG_HCUL=new Date();
        this.SEG_DIAR=0;
        this.SEG_DIAD=0;
        this.SEG_ESTC="";
        this.SEG_ABRE="";
        this.SEG_UORI="";
        this.SEG_UENC="";
        this.SEG_COME="";
        this.SEG_ESTE="",
        this.SEG_RECO="";
        this.AUD_ESTA="";
        this.AUD_USUA="";
        this.SEG_COME_TO="";
        this.AUD_UFAC=new Date()
        this.WF_ETAPA= new Wf_Etapa();

    }
    EMP_CODI:number;
    CAS_CONT:number;
    SEG_CONT:number;
    SEG_CONA:number;
    FLU_CONT:number;
    ETA_CONT:number;
    SEG_SUBJ:string;
    SEG_PRIO:string;
    SEG_FREC:Date;
    SEG_HREC:Date;
    SEG_FLIM:Date;
    SEG_HLIM:Date;
    SEG_DIAE:number;
    SEG_FCUL:Date;
    SEG_HCUL:Date;
    SEG_DIAR:number;
    SEG_DIAD:number;
    SEG_ESTC:string;
    SEG_ABRE:string;
    SEG_UORI:string;
    SEG_UENC:string;
    SEG_COME:string;
    SEG_COME_TO:string;
    SEG_ESTE:string;
    SEG_RECO:string;
    AUD_ESTA:string;
    AUD_USUA:string;
    AUD_UFAC:Date;
    WF_ETAPA:Wf_Etapa;
    
    
}