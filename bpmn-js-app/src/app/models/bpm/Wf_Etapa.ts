import { Wf_Aptos } from './Wf_Aptos';
import { Wf_Deleg } from './Wf_Deleg';
import { Wf_Usegu } from './Wf_Usegu';
import { Wf_Fetap } from './Wf_Fetap';
import { Wf_Desti } from './Wf_Desti';
import { Wf_Pswet } from './Wf_Pswet';
import { Wf_Idocu } from './Wf_Idocu';
import { Wf_Accio } from './Wf_Accio';
export class Wf_Etapa {

	constructor() {
		this.EMP_CODI = "102";
		this.FLU_CONT = 0;
		this.ETA_CONT = 0;
		this.ETA_ASUN = "";
		this.GAB_CONT = "";
		this.ETA_INST = "";
		this.ETA_CRIA = "A";
		this.ETA_PCOM = "S";
		this.ETA_PDEL = "N";
		this.ETA_PSEG = "S";
		this.ETA_PRIO = "M";
		this.ETA_MTIE = "D";
		this.ETA_DLIM = 1;
		this.ETA_HLIM = new Date();
		this.ETA_CLIM = "J";
		this.ETA_DREC = 1;
		this.ETA_MREC = 0;
		this.ETA_HREC = new Date();
		this.ETA_CREC = "J";
		this.ETA_POSX = "";
		this.ETA_POSY = "";
		this.ETA_INIC = "";
		this.ETA_SECS = 0;
		this.ETA_RECO = "N";
		this.AUD_ESTA = "A";
		this.AUD_USUA = "";
		this.AUD_UFAC = new Date();
		this.ETA_MACC = "N";
		this.CCA_CONT = "";
		this.ETA_SECU = 0;
		this.ETA_EMAI = "N";
		this.ETA_TABL = "";
		this.ETA_CAMP = "";
		this.ETA_ANTE = 0;
		this.ETA_REIB = "N";
		this.ETA_MASU = "N";
		this.ETA_CRIS = "T";
		this.ETA_ANTS = 0;
		this.ETA_NOTI = 0;
		this.ETA_SNOT = 0;
		this.ETA_APAR = "";
		this.ETA_TIMA = 0;
		this.ETA_SSQL = "";
		this.FLU_COND = 0;
		this.ETA_VMIN = 0;
		this.ETA_VMAX = 0;
		this.ETA_COST = 0;
		this.WEB_CONT = 0;
		this.MWE_CONT = 0;
		this.REG_CONT = 0;
		this.PLA_CONT = 0;
		this.DPL_CONT = 0;
		this.ETA_ACOR = "";
		this.ETA_MCOR = "";
		this.ETA_ARCH = "N";
		this.ETA_EJEC = "U";
		this.ETA_TPLA = "";
		this.ETA_PERI = "";
		this.ETA_DESD = new Date();
		this.ETA_HAST = new Date;
		this.ETA_HORA = new Date();
		this.EAT_DIAS = "";
		this.ETA_DIAM = "";
		this.ETA_EDTF = "";
		this.ETA_MMES = "";
		this.WF_APTOS = [];
		this.WF_DELEG = [];
		this.WF_USEGU = [];
		this.WF_FETAP = [];
		this.WF_DESTI = [];
		this.WF_PSWET = [];
		this.WF_IDOCU=[];	
		this.WF_ACCIO =[];
	}
	EMP_CODI: string;
	FLU_CONT: number;
	ETA_CONT: number;
	ETA_ASUN: string;
	GAB_CONT: string;
	ETA_INST: string;
	ETA_CRIA: string;
	ETA_PCOM: string;
	ETA_PDEL: string;
	ETA_PSEG: string;
	ETA_PRIO: string;
	ETA_MTIE: string;
	ETA_DLIM: number;
	ETA_HLIM: Date;
	ETA_CLIM: string;
	ETA_DREC: number;
	ETA_MREC: number;
	ETA_HREC: Date;
	ETA_CREC: string;
	ETA_POSX: string;
	ETA_POSY: string;
	ETA_INIC: string;
	ETA_SECS: number;
	ETA_RECO: string;
	AUD_ESTA: string;
	AUD_USUA: string;
	AUD_UFAC: Date;
	ETA_MACC: string;
	CCA_CONT: string;
	ETA_SECU: number;
	ETA_EMAI: string;
	ETA_TABL: string;
	ETA_CAMP: string;
	ETA_ANTE: number;
	ETA_REIB: string;
	ETA_MASU: string;
	ETA_CRIS: string;
	ETA_ANTS: number;
	ETA_NOTI: number;
	ETA_SNOT: number;
	ETA_APAR: string;
	ETA_TIMA: number;
	ETA_SSQL: string;
	FLU_COND: number;
	ETA_VMIN: number;
	ETA_VMAX: number;
	ETA_COST: number;
	WEB_CONT: number;
	MWE_CONT: number;
	REG_CONT: number;
	PLA_CONT: number;
	DPL_CONT: number;
	ETA_ACOR: string;
	ETA_MCOR: string;
	ETA_ARCH: string;
	ETA_EJEC: string;
	ETA_TPLA: string;
	ETA_PERI: string;
	ETA_DESD: Date;
	ETA_HAST: Date;
	ETA_HORA: Date;
	EAT_DIAS: string;
	ETA_DIAM: string;
	ETA_EDTF: string;
	ETA_MMES: string;
	WF_APTOS: Wf_Aptos[];
	WF_DELEG: Wf_Deleg[];
	WF_USEGU: Wf_Usegu[];
	WF_FETAP: Wf_Fetap[];
	WF_DESTI: Wf_Desti[];
	WF_PSWET: Wf_Pswet[];
	WF_IDOCU: Wf_Idocu[];
	WF_ACCIO:Wf_Accio[];
	


}