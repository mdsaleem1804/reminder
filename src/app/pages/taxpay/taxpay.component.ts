import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaxPay} from '../../shared/models/taxpay';
import {  NgForm } from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import { LoaderService } from '../../shared/services/loader/loader.service';
import { ApiResponse } from '../../shared/models/response';
import { TaxpayService } from '../../shared/services/taxpay/taxpay.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-taxpay',
  templateUrl: './taxpay.component.html',
  styleUrls: ['./taxpay.component.css']
})
export class TaxpayComponent implements OnInit {
  disabled: boolean = false;
  showTable: boolean = true;
  userId: number = 0;
  tableLoading: boolean = false;
  div_token: string = '';
    taxpay:TaxPay =new TaxPay();
    arrTaxPay: Array<TaxPay> = new Array<TaxPay>();
  constructor(
    private taxPayobj: TaxpayService,
    private _router: Router,
    private _confirmationService: ConfirmationService,
    private _loaderService: LoaderService,
    private _messageService: MessageService,
  ) { }


  ngOnInit() {
    this.listTax();
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
      this.taxPayobj.fn_InsertTaxPay(this.taxpay)
        .subscribe((data: ApiResponse) => {
          if (data.status) {
           this._messageService.add({ severity: 'success', summary: 'Success!', detail: data.message });
           this.taxpay = new TaxPay();
           this.listTax();
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
      this.taxPayobj.Update(this.taxpay)
        .subscribe((data: ApiResponse) => {
          if (data.status) {
            this._messageService.add({ severity: 'success', summary: 'Success!', detail: data.message });
            //this.taxpay = new TaxPay();
            this.listTax();
          } else {
            this._messageService.add({ severity: 'error', summary: 'Failure!', detail: data.message });
          }
          this._loaderService.hide();
        }, (error: any) => {
          console.log(error);
        });
    }
    }
  

  listTax() {
    this.tableLoading = true;
    this.taxPayobj.fn_SelectAll(this.taxpay)
      .subscribe((data: ApiResponse) => {
        //if (data.status) {
          this.arrTaxPay = data.data;
          console.log(this.arrTaxPay);         
       // }
        //else {
          //this.messageobj.add({ severity: 'error', summary: 'Failure!', detail: data.message })
      //  }
        this.tableLoading = false;
      }, (error: any) => {
        console.log(error);
      });
  }

  
  delete(id) {
    this.taxpay.taxPayId = id;
    console.log(this.taxpay.taxPayId);
    this._confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this._loaderService.show();
        this.taxPayobj.Delete(this.taxpay)
          .subscribe((data: ApiResponse) => {
            if (data.status) {
              this._messageService.add({ severity: 'success', summary: 'Success!', detail: data.message });
              this.clear();
              this.listTax();
            } else {
              this._messageService.add({ severity: 'error', summary: 'Failure!', detail: data.message });
            }
            this._loaderService.hide();
          }, (error: any) => {
            console.log(error);
          });
      }
    });
  }

  fetch(id) {
    this.taxpay.taxPayId = id;
    this._loaderService.show();
    console.log(this.taxpay.taxPayId);
    this.taxPayobj.Fetch(this.taxpay)
      .subscribe((data: ApiResponse) => {
       // if (data.status) {
          
         // this.taxpay = data.data;
          this.taxpay.typeOfTax=data.data[0].a;
          this.taxpay.taxPayingToLocation=data.data[0].b;
        //  this.tokenapi.tokenApiName = data.data[0].tokenApiName;
         // this.tokenapi.clientId = data.data[0].clientId;
          //this.tokenapi.clientSecret = data.data[0].clientSecret;

       // } else {
       //   this._messageService.add({ severity: 'error', summary: 'Failure!', detail: data.message });
       // }
        this._loaderService.hide();
      }, (error: any) => {
        console.log(error);
      });
  }

  clear() {
    this.showTable = true;
    this.disabled = false;
    this.taxpay = new TaxPay();
  }
   proceed(xGetDiv) {
     this.div_token=xGetDiv;
     this._router.navigate([''], { queryParams: { type: xGetDiv} });
 }
}
