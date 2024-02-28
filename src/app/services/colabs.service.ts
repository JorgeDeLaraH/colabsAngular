import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { _URL_USER, _URL_USERS } from "../config/config";

@Injectable({
    providedIn:'root'
})

export class colabService{
    constructor(private http: HttpClient){}

    getAllColabs():Observable<any>{
        return this.http.get(_URL_USERS)
    }
    getColab(id:string):Observable<any>{
        return this.http.get(_URL_USERS+`/${id}`)
    }
    postColab(datos:Object):Observable<Object>{
        return this.http.post(_URL_USERS,datos)
    }
    putColab(datos:Object):Observable<Object>{
        return this.http.put(_URL_USERS,datos)
    }
    /*Para el método delete se debe enviar el json mediante el body para que funcione correctamente*/
    deleteColab(datos:Object):Observable<Object>{
        return this.http.delete(_URL_USERS,{body:datos})
    }
    
}