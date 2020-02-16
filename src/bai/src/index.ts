var fs = require("fs");
import typeCode from "./typeCode";

class BAI2 {

    bai2JSON: bai2JSON

    constructor(bai2File: File) { 
        const baiFile: string = fs.readFileSync(bai2File).toString("utf-8");
       
        if (this.validateBAIFile(baiFile)) {
            this.format(baiFile);
        } else
        this.writeErrors(baiFile);
    } 

    private validateBAIFile(bai: string): boolean {
        if (this.validateBAIFormat(bai) && this.validateBAIReconciles(bai)) {
            return true
        } else
        return false
    }

    /**
     * This function validates that the BAI2 file is in the correct format
     * We do this by checking the first line starts with "01" and 
     * the last line starts with "99"
     *
     * @private
     * @param {string} bai
     * @returns {boolean}
     * @memberof BAI2
     */
    private validateBAIFormat(bai: string): boolean {
        const cleanString = this.removeBlanksFromString(bai);
        const baiByLine = cleanString.split("/n");
        const noLinesInBai = baiByLine.length;

        const startOfFile = baiByLine[0].substr(0,2);
        const endOfFile = baiByLine[noLinesInBai].substr(0,2);
        
        if (startOfFile === "01" && endOfFile === "99") {
            return true
        }
        else return false;
    }

    private validateBAIReconciles(bai: string) {
        const baiByLine = bai.split("/n");
        const baiByAccount = this.splitBaiByAccount(baiByLine);
        let truthy: Array<boolean> = [];

        baiByAccount.forEach(account => {
            const summary = this.extractSummaryStatusforAccount(account);
            const transactions = this.extractTransactions(account);
            const transSummary: SummaryStatus = this.extractTransactionsTotal(transactions);
            if (summary === transSummary) {
                truthy.push(true);
            } else truthy.push(false)
        });
        
        const isTruthy = truthy.find(function(element) {
            return element === false;
          });

        if (isTruthy === undefined) {
            return true
        }
        else return false
    }

    private extractTransactions(baiByAccount: Array<string>): Array<BankTransaction>  {
        const transactions: Array<BankTransaction> = []

        const baiByTransactions = this.splitBaiByTransactions(baiByAccount);

        baiByTransactions.forEach(transaction => {
            const transByLine = transaction.join("").split(",");
            const baiCode: BaiCode = this.lookupBAICodeDetails(transByLine[1]);

            transactions.push({
                debitCredit: baiCode.level,
                baiCode: baiCode.typeCode,
                baiCodeDescription: baiCode.description,
                amount: Number(transByLine[2]),
                custRef: transByLine[6],
            });
        });
        
        return transactions;
    }

    private writeErrors(baiFile) {
        this.bai2JSON = {
            errors: "This is broken"
        }
    }

    private removeBlanksFromString(inputString: string): string {

        const cleanString = inputString.replace(/^\s*[\r\n]/gm, "");

        return cleanString;
    }

    private splitBaiByAccount(baiByLine: Array<string>): Array<Array<string>> {
        const baiByAccount = [];

        const splitRules: rules = {
            start: "03",
            stop: "49",
            trailer: "98",
        }
        let index = 0;
        
        while (index < Number(splitRules.trailer)) {
            const start = baiByLine.indexOf(splitRules.start, index);
            const end = baiByLine.indexOf(splitRules.stop, index);
            baiByAccount.push(baiByLine.slice(start,end));
            index = end + 1;
        }
    
        return baiByAccount;
    }

    private splitBaiByTransactions(baiByLine: Array<string>): Array<Array<string>> {
        const baiByTransactions = [];

        const splitRules: rules = {
            start: "03",
            stop: "03",
            trailer: "49",
        }
        let index = 0;
        
        while (index < Number(splitRules.trailer)) {
            const start = baiByLine.indexOf(splitRules.start, index);
            const end = baiByLine.indexOf(splitRules.stop, index);
            baiByTransactions.push(baiByLine.slice(start,end));
            index = end + 1;
        }
    
        return baiByTransactions;
    }

    private extractSummaryStatusforAccount(baiByAccount: Array<string>): SummaryStatus {
        
        const concatAccountDetails: string = baiByAccount[0] + baiByAccount[1];
        const accountSplit = concatAccountDetails.split(",")
        const indexTotalCredits = accountSplit.indexOf("400");
        const indexTotalDebits = accountSplit.indexOf("100");

        const summary: SummaryStatus = {
            totalCredits: Number(accountSplit[indexTotalCredits + 1]),
            totalDebits: Number(accountSplit[indexTotalDebits + 1]),
        }

        return summary;
    }

    private lookupBAICodeDetails(BAI2Code): BaiCode {
        
        const matchedTypeCode: BaiCode = typeCode.find(code => code.typeCode = BAI2Code);

        return matchedTypeCode;

    }

    private format(baiFile: string) {
        const baiByLine: Array<string> = baiFile.split("./")
        this.bai2JSON.fileData = this.extractFileData(baiByLine);

        const accounts = [];
        const baiByAccount = this.splitBaiByAccount(baiByLine);
        baiByAccount.forEach(account => {
            const transByAccount: transactionsByAccount = {
                account: this.extractBankAccount(account),
                summary: this.extractSummaryStatusforAccount(account),
                transactions: this.extractTransactions(account),
            }
            accounts.push(transByAccount);
        }); 
        this.bai2JSON.transactionsByAccount = accounts;
    }

    private extractFileData(baiByLine: Array<string>) {
    
        const splitLine = baiByLine[0].split(",");
        const fileData: FileData = {
            creationDate: splitLine[3],
            sender: splitLine[1],
            receiver: splitLine[2],    
        };

        return fileData;
    }

    private extractTransactionsTotal(accountTransactions: Array<BankTransaction>): SummaryStatus {
        
        var runningDebitTotal: number = 0;
        var runningCreditTotal: number = 0;

        accountTransactions.forEach(transaction => {
            if (transaction.debitCredit === "DR") {
                runningDebitTotal += transaction.amount
            } 
            else if (transaction.debitCredit === "CR") {
                runningCreditTotal += transaction.amount;
            }
            else Error;
        });
        
        const transTotal: SummaryStatus = {
            totalCredits: runningCreditTotal,
            totalDebits: runningDebitTotal,
        }

        return transTotal;
    }

    private extractBankAccount(baiByAccount: Array<string>): AccountIdentifier {
        
        const concatBankAccount = baiByAccount[0].split(",")[1];
        
        const account: AccountIdentifier = {
            bsb: concatBankAccount.substr(0,6),
            accountNumber: concatBankAccount.substr(5, concatBankAccount.length)
        }

        return account;
    }
}
