var fs = require("fs");
import typeCode from "./bankCode";

class ABA {

    ABAJSON: ABAJSON

    constructor() { 
        
    } 

    public generateABAFile(ABAJSON: ABAJSON): Array<string> {
        const generatedABA = [];

        generatedABA.push(this.generateDescriptor(ABAJSON.descriptor));
        
        ABAJSON.details.forEach(paymentLine => {
            generatedABA.push(this.generateDetails(paymentLine));
        });

        generatedABA.push(this.generateTotal(ABAJSON.fileTotal));

        return generatedABA;
    }

    public validateABAFile(ABA: ABA): boolean {
        return true;
    }

    public convertABAtoJSON(ABA: string): ABAJSON {
        let ABAByLine = ABA.split("/n");

        const ABAJSON: ABAJSON = {
            descriptor: this.extractDescriptor(ABAByLine),
            details: this.extractDetails(ABAByLine),
            fileTotal: this.extractTotal(ABAByLine),
        }

        return ABAJSON;
    }

    private extractDescriptor(ABA: Array<string>): ABADescriptor {

        const descriptorLineNumber = ABA.findIndex((line) => line.substr(0,1) === "0");

        const descriptorLine = ABA[descriptorLineNumber];
        
        const ABADescriptor: ABADescriptor = {
            recordType: descriptorLine.substr(0,1),
            reelSequenceNo: descriptorLine.substr(18,2),
            bankCode: descriptorLine.substr(20,3),
            payingOrgName: descriptorLine.substr(30,26),
            payingOrgID: descriptorLine.substr(56,6),
            description: descriptorLine.substr(62,12),
            dateProcessed: descriptorLine.substr(74,6),
        }

        return ABADescriptor;
    }
    
    private extractDetails(ABA: Array<string>): Array<ABADetail> {

        const ABADetails: Array<ABADetail> = []

        const filteredDetailLines = ABA.filter((line) => line.substr(0,1) === "1");

        filteredDetailLines.forEach(paymentLine => {
            ABADetails.push({
                recordType: paymentLine.substr(0,1),
                bsb: paymentLine.substr(1,7),
                bankAccount: paymentLine.substr(8,9),
                transCode: paymentLine.substr(18,2),
                amount: Number(paymentLine.substr(20,10)),
                name: paymentLine.substr(30,32),
                lodgementRef: paymentLine.substr(62,18),
                traceBSB: paymentLine.substr(80,7),
                traceAccount: paymentLine.substr(87,9),
                remitter: paymentLine.substr(96,16),
                withholdingTax: Number(paymentLine.substr(112,8))
            });
        });
        
        return ABADetails;
    }

    private extractTotal(ABA: Array<string>): ABATotalRecord {

        const totalLineNumber = ABA.findIndex((line) => line.substr(0,1) === "7");

        const totalLine = ABA[totalLineNumber];

        const ABATotal: ABATotalRecord = {
            recordType: totalLine.substr(0,1),
            bsbFormatFiller: totalLine.substr(1,7),
            netTotal: Number(totalLine.substr(20,10)),
            creditTotal: Number(totalLine.substr(30,10)),
            debitTotal: Number(totalLine.substr(40,10)),
            countOfRecords: Number(totalLine.substr(74,6))
        }

        return ABATotal;
    }

    private generateDescriptor(ABA: ABADescriptor): string {
        const descriptor: string =  ABA.recordType + "                 "+ ABA.reelSequenceNo + ABA.bankCode + "       " 
                                    + ABA.payingOrgName + ABA.payingOrgID + ABA.description + ABA.dateProcessed +
                                    "                                        ";

        return descriptor;
    }
    
    private generateDetails(ABA: ABADetail): string {
        
        const detail: string =  ABA.recordType + + ABA.bsb + ABA.bankAccount + " " + ABA.transCode + ABA.amount + ABA.name +
                                ABA.lodgementRef + ABA.traceBSB + ABA.traceAccount + ABA.remitter + ABA.withholdingTax;

        return detail;
    }

    private generateTotal(ABA: ABATotalRecord): string {
        const total = ABA.recordType + ABA.bsbFormatFiller + "            " ;

        return total;
    }
}
