import {bank, header, remittance, trailer, payment, remittanceType, paymentType, deliveryType} from "./types";
import moment from "moment";
var IBAN = require('iban');

export default class PPS {

    header: string
    addressRequired: boolean
    payments: Array<string>
    totalPayments: number;
    remittance: Array<string>
    trailer: string

    constructor(header: header, payments: Array<payment>, remittances: Array<remittance>, trailer: trailer) {
        if (payments.find((payType) =>  payType.paymentType === paymentType.A || 
                                        payType.paymentType === paymentType.G ||
                                        payType.paymentType === paymentType.O)) {
                                            this.addressRequired = true;
                                        } else {
                                            this.addressRequired = false;
                                        }
        
        this.header = this.generateHeader(header);
        this.payments = this.generatePayments(payments);
        this.totalPayments = this.getTotalPayments(payments);
        this.remittance = this.generateRemittance(remittances)
        this.trailer = this.generateTrailer(trailer)
    }

    public generatePPSFile(): string {
        let PPSFile: string = this.header + "\n";
        this.payments.forEach(paymentLine => {
            PPSFile += paymentLine + "\n";
        });
        this.remittance.forEach(remittanceLine => {
            PPSFile += remittanceLine + "\n"
        });
        PPSFile += this.trailer;

        return PPSFile;
    }

    private generateHeader(headerInput: header): string {
        let header: string = "01";
        header += this.validateLength(8, headerInput.westpacCustomerID);
        header += moment(new Date()).format("DDMMYY");
        header += moment(new Date()).format("HHMMSS");
        header += this.validateLength(16, headerInput.remitterName);
        header += this.validateLength(10, headerInput.payerRef)
        header += this.validateLength(287, ""); 

        if (this.addressRequired === true && headerInput.address === undefined) {
            throw new Error("You need to have an address specified for the Payments you need to make")
        } else if (this.addressRequired === true) {
            header += this.validateLength(35, headerInput.address.address1);
            header += this.validateLength(35, headerInput.address.address2);
            header += this.validateLength(35, headerInput.address.address3);
            header += this.validateLength(35, headerInput.address.city);
            header += this.validateLength(35, headerInput.address.state);
            header += this.validateLength(35, headerInput.address.postcode);
        }
        return header;
    }

    private generatePayments(payments: Array<payment>): Array<string> {
        let formattedPayments: Array<string> = [];

        payments.forEach(payment => {
            let paymentLine: string = "02";
            paymentLine += this.validateLength(15, payment.creditor);
            paymentLine += this.validateNumber(13,payment.amount);
            paymentLine += this.validateLength(3,payment.currency);
            paymentLine += this.validateLength(35, payment.payeeName);
            paymentLine += this.validatePaymentAddress(payment);
            paymentLine += paymentType[payment.paymentType];
            paymentLine += paymentType[payment.remittanceType];
            paymentLine += deliveryType[payment.deliveryType];
            paymentLine += this.validateLength(17,"3");
            paymentLine += this.validateLength(15, payment.faxNumber);
            paymentLine += this.validateLength(83, "");
            paymentLine += this.validateLength(2, payment.countryCode);
            paymentLine += this.validateBankDetails(payment.bank);
            
            formattedPayments.push(paymentLine);
        });
        
        return formattedPayments;
    }

    private generateRemittance(remittances: Array<remittance>): Array<string> {
        let formattedRemittances: Array<string> = []

        remittances.forEach(remittance => {
            let remittanceLine: string = "03";
            remittanceLine += this.validateLength(10, remittance.invoiceNo);
            remittanceLine += this.validateNumber(13, remittance.invoiceAmount);
            remittanceLine += this.validateLength(1, remittance.signForInvoiceAmount);
            remittanceLine += this.validateNumber(13, remittance.invoiceAmountPaid);
            remittanceLine += this.validateLength(1, remittance.signForAmountPaid);
            remittanceLine += this.validateLength(80, remittance.remittanceDesc);
            remittanceLine += this.validateLength(93, "");
            remittanceLine += this.validateLength(10, remittance.BPAY.billerNumber);
            remittanceLine += this.validateLength(20, remittance.BPAY.customerReferenceNumber);
            
            formattedRemittances.push(remittanceLine);
        });

        return formattedRemittances;
    }

    private generateTrailer(trailer: trailer): string {
        
        let formattedTrailer = "99";
        formattedTrailer += this.validateNumber(5, this.payments.length);
        formattedTrailer += this.validateNumber(5, this.remittance.length);
        formattedTrailer += this.validateNumber(15, this.totalPayments);
        
        return formattedTrailer;
    }

    private getTotalPayments(payments: Array<payment>): number {
        let totalPayments: number = 0;

        payments.forEach(paymentLine => {
            totalPayments += paymentLine.amount
        });

        return totalPayments
    }

    private validateLength(length: number, text: string): string {
        let validatedString: string = "";
        
        if (text.length > length) {
            throw new Error("The string: " +text + " is too long! It should be " + length + " characters");
        } 
        else if (text.length < length) {
            validatedString = text.padEnd(length, " ");
        } else
        validatedString = text;
        return validatedString;
    }

    private validateNumber(length: number, amount: number): string | Error {
        let validatedNumber: string = "";

        const numberLength: number = String(amount).length;

        if (numberLength > length) {
            throw new Error("Alright money bags, try pay less money yeah?");
        } 
        else if (numberLength < length) {
            const noDecimals = String(amount).replace(".","");
            validatedNumber = noDecimals.padStart(length, "0");
        } else
        validatedNumber = String(amount);        

        return validatedNumber;
    }

    private validatePaymentAddress(payments: payment) {
        let address: string = "";

        switch (payments.remittanceType) {
            case remittanceType.P:
                address = this.validateLength(35,payments.address.address1);
                address += this.validateLength(35, payments.address.address2);
                address += this.validateLength(35, payments.address.address3);
                address += this.validateLength(27, payments.address.city);
                address += this.validateLength(8, payments.address.state);
                address += this.validateLength(9, payments.address.postcode);
                break;
        
            case remittanceType.E:
                address = this.validateLength(149, payments.emailAddress)
                break;

            default:
            address = this.validateLength(149, "")
                break;
        }
        return address;
    }

    private validateBankDetails(bankDetails: bank): string {
        
        let formattedBankDetails = "";
        formattedBankDetails += this.validateLength(35, bankDetails.IBAN);
        formattedBankDetails += this.validateLength(35, bankDetails.BIC_SWIFT),
        formattedBankDetails += this.validateLength(35, bankDetails.BSB),
        formattedBankDetails += this.validateLength(35, bankDetails.accountNumber),
        formattedBankDetails += this.validateLength(35, bankDetails.bankName),
        formattedBankDetails += this.validateLength(35, bankDetails.address.address1),
        formattedBankDetails += this.validateLength(35, bankDetails.address.address2),
        formattedBankDetails += this.validateLength(35, bankDetails.address.address3),
        formattedBankDetails += this.validateLength(25, bankDetails.address.city),
        formattedBankDetails += this.validateLength(3, bankDetails.address.state),
        formattedBankDetails += this.validateLength(9, bankDetails.address.postcode)

        return formattedBankDetails;
    }
}
