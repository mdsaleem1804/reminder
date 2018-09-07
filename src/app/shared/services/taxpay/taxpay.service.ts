import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TaxPay} from '../../../shared/models/taxpay';
import {Observable} from 'rxjs';
import {SharedLib} from '../../shared.config';
@Injectable({
  providedIn: 'root'
})
export class TaxpayService {
  xApiUrl:string=SharedLib.gMainUrl;

  constructor(private _http:HttpClient) { }
  tokenInsert(xTaxPay:TaxPay)
  {
    return this._http.post(this.xApiUrl+'api/taxpay/insert',xTaxPay)
  }
}
