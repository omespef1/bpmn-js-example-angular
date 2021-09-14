import { Wf_Aptos } from './Wf_Aptos';
import { Wf_Deleg } from './Wf_Deleg';
import { Wf_Usegu } from './Wf_Usegu';
import { Wf_Fetap } from './Wf_Fetap';
export class Wf_Etapa {

	constructor() {
		this.WF_APTOS = [];
		this.WF_DELEG = [];
		this.WF_USEGU = [];
		this.WF_FETAP = [{ EMP_CODI: 102, PLA_CONT: 0, AUD_UFAC: new Date(), AUD_ESTA: "A", FET_DEFU: "S", FET_DELE: "S", FET_INSE: "S", FET_ORDE: 0, FET_SDIN: "S", FLU_CONT: 0, ETA_CONT: 0, FRM_CODI: 'SCMCOTIZ', FOR_CONT: 0, AUD_USUA: '' }];
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
	ETA_DLIM: string;
	ETA_HLIM: string;
	ETA_CLIM: string;
	ETA_DREC: number;
	ETA_MREC: number;
	ETA_HREC: string;
	ETA_CREC: number;
	ETA_POSX: string;
	ETA_POSY: string;
	ETA_INIC: string;
	ETA_SECS: string;
	ETA_RECO: string;
	AUD_ESTA: string;
	AUD_USUA: string;
	AUD_UFAC: string;
	ETA_MACC: string;
	CCA_CONT: string;
	ETA_SECU: string;
	ETA_EMAI: string;
	ETA_TABL: string;
	ETA_CAMP: string;
	ETA_ANTE: string;
	ETA_REIB: string;
	ETA_MASU: string;
	ETA_CRIS: string;
	ETA_ANTS: string;
	ETA_NOTI: string;
	ETA_SNOT: string;
	ETA_APAR: string;
	ETA_TIMA: string;
	ETA_SSQL: string;
	FLU_COND: string;
	ETA_VMIN: string;
	ETA_VMAX: string;
	ETA_COST: string;
	WEB_CONT: string;
	MWE_CONT: string;
	REG_CONT: string;
	PLA_CONT: string;
	DPL_CONT: string;
	ETA_ACOR: string;
	ETA_MCOR: string;
	ETA_ARCH: string;
	ETA_EJEC: string;
	ETA_TPLA: string;
	ETA_PERI: string;
	ETA_DESD: string;
	ETA_HAST: string;
	ETA_HORA: string;
	EAT_DIAS: string;
	ETA_DIAM: string;
	ETA_EDTF: string;
	ETA_MMES: string;
	WF_APTOS: Wf_Aptos[];
	WF_DELEG: Wf_Deleg[];
	WF_USEGU: Wf_Usegu[];
	WF_FETAP: Wf_Fetap[];

}