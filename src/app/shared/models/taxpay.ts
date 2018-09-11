export class TaxPay
{
    public taxPayId :number =0;
    public typeOfTax:string;
    public taxPayingToLocation:string;
    public buildingName:string;
    public taxNo:string;
    public payingDetails:string;
    public lastRenewedDate:Date;
    public lastRenewedAmount:number;
    public nextRenewedDate:Date;
    public nextRenewedAmount:number;
}