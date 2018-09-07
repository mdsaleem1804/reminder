import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaxPay} from '../../shared/models/taxpay';
import {  NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { LoaderService } from '../../shared/services/loader/loader.service';
import { TaxPayService } from '../../shared/services/taxpay/taxpay.service';
@Component({
  selector: 'app-taxpay',
  templateUrl: './taxpay.component.html',
  styleUrls: ['./taxpay.component.css']
})
export class TaxpayComponent implements OnInit {

  div_token: string = '';
    taxpay:TaxPay =new TaxPay();
  constructor(
    private _router: Router,
    private _confirmationService: ConfirmationService,
    private _loaderService: LoaderService,
    private _taxpayService: TaxPayService,
  ) { }

  ngOnInit() {
  }
  taxPaySave(form: NgForm) {
    if (form.invalid) {
      for (const name in form.controls) {
        if (form.controls[name].invalid) {
          document.getElementsByName(name)[0].focus();
          return;
        }
      }
      return;
    }
    this._confirmationService.confirm({
      message: 'Are you sure that you want to save?',
      accept: () => {
        this.addTaxPay();
      }
    });
  }

  addTaxPay() {
    if (this.taxpay.taxPayId == 0) {
      this._loaderService.show();
      this.tokenobj.tokenInsert(this.taxpay)
        .subscribe((data: ApiResponse) => {

          if (data.status) {
            this._messageService.add({ severity: 'success', summary: 'Success!', detail: data.message });
            this.tokenapi = new TokenApi();
            this.listToken();
          } else {
            this._messageService.add({ severity: 'error', summary: 'Failure!', detail: data.message });
          }
          this._loaderService.hide();
        }, (error: any) => {
          console.log(error);
        });
    }
    else {
      this._loaderService.show();
      this.tokenobj.tokenUpdate(this.tokenapi)
        .subscribe((data: ApiResponse) => {

          if (data.status) {
            this._messageService.add({ severity: 'success', summary: 'Success!', detail: data.message });
            this.tokenapi = new TokenApi();
            this.listToken();
          } else {
            this._messageService.add({ severity: 'error', summary: 'Failure!', detail: data.message });
          }
          this._loaderService.hide();
        }, (error: any) => {
          console.log(error);
        });
    }
  }

   proceed(xGetDiv) {
     this.div_token=xGetDiv;
     this._router.navigate([''], { queryParams: { type: xGetDiv} });
 }
}
