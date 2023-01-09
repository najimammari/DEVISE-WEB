import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Declaration} from "../model/Declaration";

@Injectable({
  providedIn: 'root'
})
export class ReferentielService {
  //baseURL: string = "http://localhost:8082/";
  baseURL: string = "http://172.19.144.1:8082/";
  constructor(private http: HttpClient) { }

  getPaysValide(): Observable<any> {
    return this.http.get<any>(this.baseURL + 'paysSecondaryValide')
  }
  getPosteFrontalierValide(): Observable<any> {
    return this.http.get<any>(this.baseURL + 'pointFrontalierSecondaryValide')
  }
  getTypeDeviseValide(): Observable<any> {
    return this.http.get<any>(this.baseURL + 'typeDeviseSecondaryValide')
  }
  getTypeIdentifiantValide(): Observable<any> {
    return this.http.get<any>(this.baseURL + 'typeIdentifiantSecondaryValide')
  }

  getNatureTitres(): Observable<any> {
    return this.http.get<any>(this.baseURL + 'natureTitres')
  }
  getTypeJustificatif(): Observable<any> {
    return this.http.get<any>(this.baseURL + 'typeJustificatif')
  }
  soumettreDeclaration(declaration:Declaration): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(declaration);
    console.log(body)
    return this.http.post(this.baseURL + 'saveDeclaration', body,{'headers':headers})
  }
}
