interface Accounts {
    
}

interface bai2JSON {
    fileData?: FileData,
    transactionsByAccount?: Array<transactionsByAccount>,
    errors?: string;
}

interface transactionsByAccount {
    account: AccountIdentifier,
    summary: SummaryStatus,
    transactions: Array<BankTransaction>
}

interface BaiCode {
    typeCode: string,
    transaction: string,
    level: string,
    description: string,
}

interface FileData {
    sender: string,
    receiver: string,
    creationDate: string,
}
interface AccountIdentifier {
    bsb: string,
    accountNumber: string,
}

interface SummaryStatus {
    totalDebits: number,
    totalCredits: number,
}

interface BankTransaction {
    debitCredit: string,
    baiCode: string,
    baiCodeDescription: string,
    amount: number,
    fundsType?: string,
    bankRef?: string,
    custRef: string,
    text?: string,
}

interface rules {
    start: string,
    stop: string,
    trailer: string
}