import { Wf_Accio } from './Wf_Accio';
import { Wf_Flujo } from './Wf_Flujo';
export class Diagram {


flow:Wf_Flujo;
xml:string;



}


export class DiagramModel {

  children:Children[];


}


export class Children {
id:string;
width:number;
height:number;
type:string;
}


export class SecuenceForm {
 

    constructor(){
        this.probability=0;
        this.nameAction="";
        this.actionsList = [];
    }
    probability:number;
    nameAction:string;
    actionsList:Wf_Accio[] ;
}