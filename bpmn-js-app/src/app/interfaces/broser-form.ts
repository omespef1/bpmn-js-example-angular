import { SafeResourceUrl } from "@angular/platform-browser";
import { BehaviorSubject, Observable } from "rxjs";

export  class IBrowserForm {

    formCode:string;
    formName:string;
    url: BehaviorSubject<SafeResourceUrl> 
    urlObserver$: Observable<SafeResourceUrl>;

}