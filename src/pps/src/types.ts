export interface header {
    westpacCustomerID: string,
    remitterName: string,
    payerRef: string,
    address: address,
}

interface address {
    address1: string,
    address2: string,
    address3: string,
    city: string,
    state: string,
    postcode: string
}

export interface payment {
    creditor: string,
    amount: number,
    currency: string,
    payeeName: string,
    remittanceType: remittanceType,
    emailAddress: string,
    paymentType: paymentType,
    address: address,
    deliveryType: deliveryType,
    faxNumber: string,
    countryCode: string,
    bank: bank
}

export interface bank {
    IBAN: string,
    BIC_SWIFT: string,
    BSB: string,
    accountNumber: string,
    bankName: string,
    address: address
}

export interface remittance {
    invoiceNo: string,
    invoiceDate: string,
    invoiceAmount: number
    signForInvoiceAmount: string,
    invoiceAmountPaid: number,
    signForAmountPaid: string,
    remittanceDesc: string
    BPAY: BPAY
}

interface BPAY {
    billerNumber: string,
    customerReferenceNumber: string,
}

export interface trailer {
    totalPayments: number,
}

export enum deliveryType {
    N,
    P

}

export enum remittanceType {
    N, // "None",
    P, // "Post",
    E, // "Email",
    F, // "Fax"
}

export enum paymentType {
    B, // "BPAY",
    C, // "Cheques",
    D, // "Domestic Entry (EFT)",
    R, // "Remittance", 
    G, // "RTGS", 
    A, // "ACH EFT International", 
    O, //  "OTT"
}

export interface LineFormat {
    fieldName: string,
    size: number,
    position: {
        start: number,
        end: number,
    },
    notes: string,
    mandatoryForPaymentTypes: Array<HeaderPaymentType>
}

const PPSOutHeaderFormat: Array<LineFormat> = [
    {
        fieldName: "Record Identifier",
        size: 2,
        position: {
            start: 1,
            end: 2
        },
        notes: "Must be 01",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Customer Identifier",
        size: 8,
        position: {
            start: 3,
            end: 10
        },
        notes: "Must be uppercase. This is a unique customer identifier to identify customer coming into Westpac PPS. Allocated by Westpac at the start of the customer implementation",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "File date",
        size: 6,
        position: {
            start: 11,
            end: 16
        },
        notes: "DDMMYY - must be a valid date and not more than 14 days in the future. This date denotes the day that the file should be processed.",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Creation Time",
        size: 6,
        position: {
            start: 17,
            end: 22
        },
        notes: "HHMMSS, together with File Date used to detect duplicate file",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Name of Remitter",
        size: 16,
        position: {
            start: 23,
            end: 38
        },
        notes: "Mandatory",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Payer reference",
        size: 10,
        position: {
            start: 39,
            end: 48
        },
        notes: "Preferable to be unique",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Header Filler",
        size: 287,
        position: {
            start: 49,
            end: 335
        },
        notes: "All Filler No Killer!",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Remitter Address 1",
        size: 35,
        position: {
            start: 336,
            end: 370
        },
        notes: "Location Address of Remitter (ie street address)",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Remitter Address 2",
        size: 35,
        position: {
            start: 371,
            end: 405
        },
        notes: "Left justified, space filled",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Remitter Address 3",
        size: 35,
        position: {
            start: 406,
            end: 440
        },
        notes: "Left justified, space filled",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Remitter City",
        size: 25,
        position: {
            start: 441,
            end: 465
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Remitter State",
        size: 3,
        position: {
            start: 466,
            end: 468
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Remitter Postcode",
        size: 9,
        position: {
            start: 469,
            end: 477
        },
        notes: "Must be 01",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "I"}
        ]
    }
]

const PPSOutPaymentFormat: Array<LineFormat> = [
    {
        fieldName: "Record Identifier",
        size: 2,
        position: {
            start: 1,
            end: 2
        },
        notes: "Must be 02",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Reference/Creditor",
        size: 15,
        position: {
            start: 3,
            end: 17
        },
        notes: "A unique reference/creditor number. Must be unique for every payment line.",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Amount",
        size: 13,
        position: {
            start: 18,
            end: 30
        },
        notes: "Amount is two decimal places with implied decimal point.",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Currency",
        size: 3,
        position: {
            start: 31,
            end: 33
        },
        notes: "Mandatory",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Payee Name",
        size: 35,
        position: {
            start: 34,
            end: 68
        },
        notes: "Name of Account. For Cheques the Payee Name will be used for the Postal Address as as the name on the cheque. For Payee Names greater than 35 characters please use field C60.",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Payee Address 1",
        size: 35,
        position: {
            start: 69,
            end: 103
        },
        notes: "If Remittance Type is P we need the land mail address. If Remittance Type is E we need an email address, For Cheques this is the physical mailing address.",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Payee Address 2",
        size: 35,
        position: {
            start: 104,
            end: 138
        },
        notes: "For International ACH payments the email address can be no longer than 49 characters. For other payment channels the email address can be no longer than 80 characters",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Payee Address 3",
        size: 35,
        position: {
            start: 139,
            end: 173
        },
        notes: "The first 10 characters are a continuation of the payee's adress. ",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Payee City",
        size: 25,
        position: {
            start: 174,
            end: 198
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Payee Filler 1",
        size: 2,
        position: {
            start: 199,
            end: 200
        },
        notes: "All Filler No Killer!",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Payee State",
        size: 3,
        position: {
            start: 201,
            end: 203
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Payee Filler 2",
        size: 5,
        position: {
            start: 204,
            end: 208
        },
        notes: "All Filler No Killer!",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Payee Postcode",
        size: 9,
        position: {
            start: 209,
            end: 217
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Payment Type",
        size: 1,
        position: {
            start: 218,
            end: 218
        },
        notes: "B for BPAY, C for Cheques, D for Domestic Entry (EFT), R for Remittance, G for RTGS, A for ACH EFT International, O for OTT",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Remittance Type",
        size: 1,
        position: {
            start: 219,
            end: 219
        },
        notes: "For BPAY use N, EFT use E for email, for Cheques use P",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Delivery Type",
        size: 1,
        position: {
            start: 220,
            end: 220
        },
        notes: "Use N unless Remittance Type is P",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Delivery Priority",
        size: 1,
        position: {
            start: 221,
            end: 221
        },
        notes: "Use 3",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Filler",
        size: 16,
        position: {
            start: 222,
            end: 237
        },
        notes: "All Filler No Killer!",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Payee Fax Number",
        size: 15,
        position: {
            start: 238,
            end: 252
        },
        notes: "The fax number should contain the full area code with no embedded spaces, brackets, dashes or special characters.",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"}
        ] 
    },
    {
        fieldName: "Statement Narrative",
        size: 18,
        position: {
            start: 253,
            end: 270
        },
        notes: "For BPAY the first 9 characters are an optional sequence number",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Remarks",
        size: 35,
        position: {
            start: 271,
            end: 305
        },
        notes: "Optional",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Cheque Number",
        size: 7,
        position: {
            start: 306,
            end: 312
        },
        notes: "Only used for Au and NZ Cheques. If not supplied Westpac will allocated cheque number. Right justified and zero filled.",
        mandatoryForPaymentTypes: [
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"}
        ] 
    },
    {
        fieldName: "Filler",
        size: 23,
        position: {
            start: 313,
            end: 335
        },
        notes: "All Filler No Killer!",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Country Code",
        size: 2,
        position: {
            start: 336,
            end: 337
        },
        notes: "Country code that the beneficiary accounts are domiciled in. Country codes are standard ISO codes. For cheques it is the country where the person lives.",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Beneficiary IBAN",
        size: 35,
        position: {
            start: 338,
            end: 372
        },
        notes: "An IBAN typically contains a bank code and an account number, and depending on the country can contain a sort code and check digits etc. The complete IBAN number must be specified. For USD and CAD transactions there is no IBAN number, it will consist of a routing code (ABA number) and account number.",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "I"},
        ] 
    },
    {
        fieldName: "Beneficiary Bank BIC/SWIFT (Bank Identifier Code)",
        size: 35,
        position: {
            start: 373,
            end: 407
        },
        notes: "Used in AU and NZ OTT payments. Global SWIFT Code",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
        ] 
    },
    {
        fieldName: "Beneficiary BSB",
        size: 35,
        position: {
            start: 408,
            end: 442
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "I"},
        ] 
    },
    {
        fieldName: "Beneficiary Account Number",
        size: 35,
        position: {
            start: 443,
            end: 477
        },
        notes: "Used for International Payments. ",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
        ] 
    },
    {
        fieldName: "Beneficiary Bank Name",
        size: 35,
        position: {
            start: 478,
            end: 512
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
        ] 
    },
    {
        fieldName: "Beneficiary Bank Address 1",
        size: 35,
        position: {
            start: 513,
            end: 547
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
        ] 
    },
    {
        fieldName: "Beneficiary Bank Address 2",
        size: 35,
        position: {
            start: 548,
            end: 585
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
        ] 
    },
    {
        fieldName: "Beneficiary Bank Address 3",
        size: 35,
        position: {
            start: 583,
            end: 617
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
        ] 
    },
    {
        fieldName: "Beneficiary Bank City",
        size: 25,
        position: {
            start: 618,
            end: 642
        },
        notes: "Must be 02",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
        ] 
    },
    {
        fieldName: "Beneficiary Bank State",
        size: 3,
        position: {
            start: 643,
            end: 645
        },
        notes: "Must be 02",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
        ] 
    },
    {
        fieldName: "Beneficiary Bank Postcode",
        size: 9,
        position: {
            start: 646,
            end: 654
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
        ] 
    },
    {
        fieldName: "Payee Location Address 1",
        size: 35,
        position: {
            start: 655,
            end: 689
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Payee Location Address 2",
        size: 35,
        position: {
            start: 690,
            end: 724
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Payee Location Address 3",
        size: 35,
        position: {
            start: 725,
            end: 759
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Payee Location City",
        size: 25,
        position: {
            start: 760,
            end: 784
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Payee Location State",
        size: 3,
        position: {
            start: 785,
            end: 787
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Payee Location Postcode",
        size: 9,
        position: {
            start: 788,
            end: 796
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Intermediary Bank BIC/SWIFT ",
        size: 35,
        position: {
            start: 797,
            end: 831
        },
        notes: "This field specifies the finanical institution through which the transaction must pass to reach the account with beneficiary bank. Must be Global SWIFT address.",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
        ] 
    },
    {
        fieldName: "Intermediary Bank Account",
        size: 35,
        position: {
            start: 832,
            end: 866
        },
        notes: "This needs to be populated only if a specific account is to be used at the Intermediary Bank.",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
        ] 
    },
    {
        fieldName: "Intermediary Bank Name",
        size: 35,
        position: {
            start: 867,
            end: 901
        },
        notes: "This field specifies the financial institution through which the transaction must pass to reach the account with beneficiary bank eg. bank name and address.",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
        ] 
    },
    {
        fieldName: "Intermediary Bank Address 1",
        size: 35,
        position: {
            start: 302,
            end: 936
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
        ] 
    },
    {
        fieldName: "Intermediary Bank Address 2",
        size: 35,
        position: {
            start: 937,
            end: 971
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
        ] 
    },
    {
        fieldName: "Intermediary Bank Address 3",
        size: 35,
        position: {
            start: 972,
            end: 1006
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
        ] 
    },
    {
        fieldName: "Intermediary Bank City",
        size: 25,
        position: {
            start: 1007,
            end: 1031
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
        ] 
    },
    {
        fieldName: "Intermediary Bank State",
        size: 3,
        position: {
            start: 1032,
            end: 1034
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
        ] 
    },
    {
        fieldName: "Intermediary Bank Postcode",
        size: 9,
        position: {
            start: 1035,
            end: 1043
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
        ] 
    },
    {
        fieldName: "Funding Currency",
        size: 3,
        position: {
            start: 1044,
            end: 1046
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
        ] 
    },
    {
        fieldName: "Remitter BSB (funding account)",
        size: 35,
        position: {
            start: 1047,
            end: 1081
        },
        notes: "Usually blank. Please let Westpac know if you are going to use this",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Remitter Account Number (funding account)",
        size: 35,
        position: {
            start: 1082,
            end: 1116
        },
        notes: "Usually blank. Please let Westpac know if you are going to use this.",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Funding Amount",
        size: 13,
        position: {
            start: 1117,
            end: 1129
        },
        notes: "If blank if will be assumed that a WBC carded exchange rate is to be applied.",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
        ] 
    },
    {
        fieldName: "Dealer Reference - FX Deal",
        size: 16,
        position: {
            start: 1130,
            end: 1145
        },
        notes: "As specified by the foreign exchange dealer",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
        ] 
    },
    {
        fieldName: "Exchange Rate",
        size: 16,
        position: {
            start: 1146,
            end: 1161
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
        ] 
    },
    {
        fieldName: "Payee Name Extended",
        size: 140,
        position: {
            start: 1162,
            end: 1301
        },
        notes: "Optional for all payments. This field can be used when Payee Name exceeds 35 characters. ",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ] 
    },
    {
        fieldName: "Debtor Agent",
        size: 35,
        position: {
            start: 1302,
            end: 1336
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
        ] 
    },
    {
        fieldName: "Indian IFSC Code",
        size: 35,
        position: {
            start: 1337,
            end: 1371
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "O"},
        ]  
    }
]

const PPSOutRemittanceFormat: Array<LineFormat> = [
    {
        fieldName: "Record Identifier",
        size: 2,
        position: {
            start: 1,
            end: 2
        },
        notes: "Must be 03",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Invoice number",
        size: 10,
        position: {
            start: 3,
            end: 12
        },
        notes: "",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Invoice date",
        size: 6,
        position: {
            start: 13,
            end: 18
        },
        notes: "DDMMYY - date of original Invoice",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Invoice Amount",
        size: 13,
        position: {
            start: 19,
            end: 31
        },
        notes: "Value of original Invoice",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Sign for Invoice amount",
        size: 1,
        position: {
            start: 32,
            end: 32
        },
        notes: "+ or -",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Invoice amount paid",
        size: 13,
        position: {
            start: 33,
            end: 45
        },
        notes: "Value of Payment Line",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Sign for amount paid",
        size: 1,
        position: {
            start: 46,
            end: 46
        },
        notes: "+ or -",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Remittance description",
        size: 80,
        position: {
            start: 47,
            end: 126
        },
        notes: "Description of payment line amount",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Deduction amount",
        size: 13,
        position: {
            start: 127,
            end: 139
        },
        notes: "All zeros",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Deduction description",
        size: 80,
        position: {
            start: 140,
            end: 219
        },
        notes: "Blank",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Biller Number",
        size: 10,
        position: {
            start: 220,
            end: 229
        },
        notes: "For BPAY this is BPAY Biller code",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
        ]
    },
    {
        fieldName: "Customer Reference Number",
        size: 20,
        position: {
            start: 230,
            end: 249
        },
        notes: "For BPAY this is the BPAY CRN.",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
        ]
    },
    {
        fieldName: "Additional CRN",
        size: 20,
        position: {
            start: 250,
            end: 269
        },
        notes: "For BPAY this is an additional BPAY CRN",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
        ]
    },
    {
        fieldName: "Service Code",
        size: 7,
        position: {
            start: 270,
            end: 276
        },
        notes: "For BPAY this is the BPAY service code",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
        ]
    },
    {
        fieldName: "Invoice Filler",
        size: 59,
        position: {
            start: 277,
            end: 335
        },
        notes: "All Filler No Killer!",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    } 
]

const PPSOutTrailerFormat: Array<LineFormat> = [
    {
        fieldName: "Record Identifier",
        size: 2,
        position: {
            start: 1,
            end: 2
        },
        notes: "Must be 99",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Number of payment records",
        size: 5,
        position: {
            start: 3,
            end: 7
        },
        notes: "Total of all 02 records in file",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Number of remittance records",
        size: 5,
        position: {
            start: 8,
            end: 12
        },
        notes: "Total of all 03 records in file",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Hash File Total",
        size: 15,
        position: {
            start: 13,
            end: 27
        },
        notes: "The toal of Amount for all the payment entries",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    },
    {
        fieldName: "Trailer Filler",
        size: 308,
        position: {
            start: 28,
            end: 335
        },
        notes: "All Filler No Killer!",
        mandatoryForPaymentTypes: [
            {type: "EFT", code: "A"},
            {type: "EFT", code: "N"},
            {type: "EFT", code: "R"},
            {type: "EFT", code: "O"},
            {type: "EFT", code: "I"},
            {type: "Cheque", code: "A"},
            {type: "Cheque", code: "N"},
            {type: "Cheque", code: "I"}
        ]
    }
]

interface HeaderPaymentType {
    type: string,
    code: string,
    description?: string,
}

const headerPaymentTypes: Array<HeaderPaymentType> =[
    {
        type: "EFT",
        code: "A",
        description: "Australian Direct Entry (PPS)"
    },
    {
        type: "EFT",
        code: "N",
        description: "New Zealand Direct Entry"
    },
    {
        type: "EFT",
        code: "R",
        description: "Australian (RTGS) Real Time Gross Settlement"
    },
    {
        type: "EFT",
        code: "O",
        description: "Australian and New Zealand OTT"
    },
    {
        type: "EFT",
        code: "I",
        description: "International ACH Payments"
    },
    {
        type: "Cheque",
        code: "A",
        description: "Australian Cheques (PPS)"
    },
    {
        type: "Cheque",
        code: "N",
        description: "New Zealand Cheques (PPS)"
    },
    {
        type: "Cheque",
        code: "I",
        description: "International Draft Payments"
    }
]