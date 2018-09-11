import { Injectable, Optional } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Http,RequestOptions,Headers} from '@angular/http';
import {TaxPay} from '../../models/taxpay';
import {Observable} from 'rxjs';
import {SharedLib} from '../../shared.config';
@Injectable({
  providedIn: 'root'
})
export class TaxpayService {
  xUrl:string=SharedLib.gMainUrl;
  constructor(private _http:HttpClient) { }
  fn_InsertTaxPay(xTaxPay:TaxPay)
  {
   //var headers = new Headers();
    //headers.append('Content-Type', 'application/json' ); 
    //let options = new RequestOptions({ headers: headers })
    return this._http.post('http://localhost:8080/reminder_api/insert.php?json=',xTaxPay)
  }
  fn_SelectAll(xTaxPay:TaxPay)
  {
    return this._http.post('http://localhost:8080/reminder_api/select_all.php',xTaxPay)
   // return this._http.post('http://localhost:8080/reminder_api/test2.php?json=',xTaxPay)
  }

  Delete(xTaxPay:TaxPay) {
    return this._http.post('http://localhost:8080/reminder_api/delete.php?json=', xTaxPay)
  }
  Fetch(xTaxPay:TaxPay) {
    return this._http.post('http://localhost:8080/reminder_api/select_id.php?json=', xTaxPay)
  }
  Update(xTaxPay:TaxPay) {
    return this._http.post('http://localhost:8080/reminder_api/update.php?json=', xTaxPay)
  }
}
