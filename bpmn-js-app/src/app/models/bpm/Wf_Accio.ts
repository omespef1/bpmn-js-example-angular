import { Wf_Conac } from "./Wf_Conac";
import { Wf_Mxacc } from './Wf_Mxacc';

export class Wf_Accio {


    constructor(){

        this.EMP_CODI=0;
        this.FLU_CONT=0;
        this.ETA_CONT=0;
        this.ACC_CONT=0;
        this.ACC_NOMB="";
        this.ACC_ESTA="";
        this.ACC_ABRE="";
        this.AUD_ESTA="";
        this.AUD_USUA="";
        this.AUD_UFAC=new Date;
        this.ACC_ESTT="";
        this.PLA_CONT=0;
        this.DPL_CONT=0;
        this.FRM_CODI=0;
        this.CAM_CODI=0;
        this.ACC_DEFE="";
        this.ACC_COND=0;
        this.ACC_VALO=0;
        this.WF_CONAC=[];
        this.WF_MXACC=[];     
        this.expanded=true;

    }
EMP_CODI:number;
FLU_CONT:number;
ETA_CONT:number;
ACC_CONT:number;
ACC_NOMB:string;
ACC_ESTA:string;
ACC_ABRE:string;
AUD_ESTA:string;
AUD_USUA:string;
AUD_UFAC:Date;
ACC_ESTT:string;
PLA_CONT:number;
DPL_CONT:number;
FRM_CODI:number;
CAM_CODI:number;
ACC_DEFE:string;
ACC_COND:number;
ACC_VALO:number;
WF_CONAC: Wf_Conac[];
WF_MXACC:Wf_Mxacc[];
expanded:boolean;
}