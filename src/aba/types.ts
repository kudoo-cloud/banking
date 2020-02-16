interface BankCode {
    BankCode: string,
    BankName: string,  
  }
  
interface ABAJSON {
    descriptor: ABADescriptor,
    details: Array<ABADetail>,
    fileTotal: ABATotalRecord,
}

interface ABADescriptor {
    recordType: string,
    reelSequenceNo: string, // Think this is always 01
    bankCode: string,
    payingOrgName: string,
    payingOrgID: string,
    description: string,
    dateProcessed: string,
}

interface ABADetail {
    recordType: string,
    bsb: string, 
    bankAccount: string,
    transCode: string // Generally 53 for a Payment
    amount: number,
    name: string,
    lodgementRef: string,
    traceBSB: string,
    traceAccount: string,
    remitter: string,
    withholdingTax: number
}

interface ABATotalRecord {
    recordType: string,
    bsbFormatFiller: string,
    netTotal: number,
    creditTotal: number,
    debitTotal: number,
    countOfRecords: number
}

const tranCodes = [{
    code: 13,
    description: "Externally initiated debit items"
},
{
    code: 50,
    description: "Externally initiated credit terms with the exception of those bearing Transaction Codes"
},
{
    code: 51,
    description: "Australian Government Security Interest"
},
{
    code: 52,
    description: "Family Allowance"
},
{
    code: 53,
    description: "Pay"
},
{
    code: 54,
    description: "Pension"
},
{
    code: 55,
    description: "Allotment"
},
{
    code: 56,
    description: "Dividend"
},
{
    code: 57,
    description: "Debenture/Note Interest"
}]
