import {header, payment, remittanceType, paymentType, remittance, trailer, deliveryType} from "./types";
import PPS from "./pps";

const header: header = {
    westpacCustomerID: "GN000147",
    remitterName: "RHCI Pharm PPS",
    payerRef: "Unique ID",
    address: {
        address1: "40 Canna Cresenct",
        address2: "",
        address3: "",
        city: "Slummies",
        state: "Eastern Cape",
        postcode: "4006"
    }
}

let payments: Array<payment> = [
    {
        creditor: "CRE001",
        amount: 180.59,
        currency: "AUD",
        payeeName: "Creditor BOB",
        emailAddress: "bob@tmarts.com.au",
        remittanceType: remittanceType.E,
        paymentType: paymentType.D,
        address: {
            address1: "bob@tmarts.com.au", // When remittance is of type E, then this is the email address
            address2: "",
            address3: "",
            city: "",
            state: "",
            postcode: ""
        },
        deliveryType: deliveryType.N,
        faxNumber: "",
        countryCode: "AU",
        bank: {
            IBAN: "",
            BIC_SWIFT: "",
            BSB: "032-050",
            accountNumber: "111111",
            bankName: "Westpac",
            address: {
                address1: "",
                address2: "",
                address3: "",
                city: "",
                state: "",
                postcode: ""
            }
        }
    },
    {
        creditor: "CRE002",
        amount: 250.25,
        currency: "USD",
        payeeName: "Tupac Shakur",
        emailAddress: "bob@tmarts.com.au",
        remittanceType: remittanceType.P,
        paymentType: paymentType.A,
        address: {
            address1: "150 Nowhere Street",
            address2: "",
            address3: "",
            city: "Los Angeles",
            state: "Cali",
            postcode: "4900"
        },
        deliveryType: deliveryType.P,
        faxNumber: "",
        countryCode: "US", 
        bank: {
            IBAN: "",
            BIC_SWIFT: "",
            BSB: "032-051",
            accountNumber: "111110",
            bankName: "Westpac",
            address: {
                address1: "",
                address2: "",
                address3: "",
                city: "",
                state: "",
                postcode: ""
            }
        }
    },
    {
        creditor: "CRE003",
        amount: 1569.58,
        currency: "AUD",
        payeeName: "Clivey Boi",
        emailAddress: "clive@tmarts.com.au",
        remittanceType: remittanceType.F,
        paymentType: paymentType.G,
        address: {
            address1: "150 Nowhere Street",
            address2: "",
            address3: "",
            city: "Los Angeles",
            state: "Cali",
            postcode: "4900"
        },
        deliveryType: deliveryType.N,
        faxNumber: "12345569",
        countryCode: "AU",
        bank: {
            IBAN: "",
            BIC_SWIFT: "",
            BSB: "032-052",
            accountNumber: "111112",
            bankName: "Westpac",
            address: {
                address1: "",
                address2: "",
                address3: "",
                city: "",
                state: "",
                postcode: ""
            }
        }
    }
];

let remittances: Array<remittance> = [
    {
       invoiceNo: "INV001",
       invoiceDate: "23112018",
       invoiceAmount: 180.59, 
       signForInvoiceAmount: "+",
       invoiceAmountPaid: 250.98,
       signForAmountPaid: "-",
       BPAY: {
           billerNumber: "",
           customerReferenceNumber: ""
       },
       remittanceDesc: "This is your remittance Advice"
    }
];

const trailer: trailer = {
    totalPayments: 180.59
}

let pps = new PPS(header, payments, remittances, trailer);

export default pps;