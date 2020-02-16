# File layout

Record Type: 01 – File Header – indicating the beginning of the file
Record Type: 02 – Group Header – identifying the group of accounts – a file may contain multiple groups, and would be followed by a 03 record
Record Type: 03 – Account Identifier & Summary Status – indicating the account number, activity summary and account status information
Record Type: 16 – Transaction Detail – as it says! Transaction detail information such as generic reference information is indicated in this record type (optional record)
Record Type: 49 – Account Trailer – indicating account control totals
Record Type: 98 – Group Trailer – indicating group control totals
Record Type: 99 – File Trailer – end of file indicator

# BAI2 file
Will only ever contain 1 record header (record type 01) and file trailer (record type 99)
Can contain multiple groups, where this happens the record type 02, 03, 16, 49, 98 would be repeated

# BAI2 Record Formats:
Note: All of the below fields within a specific record are comma separated
BAI2 Format – File Header – 01

* Record code – 01
* Sender Id – alphanumeric value
* Receiver Id – alphanumeric value
* File Creation Date – YYMMDD format
* File Identification Number – Unique value to distinguish files sent on the same date
* Physical Record length – optional
* Block Size – optional
* Version Number – 2

# BAI2 Format – Group Header – 02
Note: A group header highlights accounts from the same originator with the same as-of date

* Record Code – 02
* Ultimate Receiver Notification – optional, normally banks put the same value as in Receiver Id from the Header Record
* Originator Identification – bank code or SWIFT BIC where the account being reported (in record 3) is held
* Group Status:
    1 – Update – most commonly used for previous day reporting and same day reporting
    2 – Deletion
    3 – Correction
    4 – Test Only
* As of Date – YYMMDD – as of date of all accounts with the group
* As of Time – HHMM – in military format i.e. from 0000 – 2359
* Currency Code
* As of Date Modifier:
    1 – Interim previous day data
    2 – Final previous day – most commonly used for prior day reporting
    3 – Interim same day – most commonly used for intra-day reporting
    4 – Final same day

# BAI2 Format – Account Identifier & Summary Status – 03

* Record Code – 03
* Customer Account Number – at the originator financial institution
* Currency Code – optional
* Type Code – optional* – indicates the type of balance (Summary/Transaction) being reported. – in this record type Account Status &  Activity Summary codes are used
* Amount – optional
* Item Count – optional*
* Funds Type – optional*

# BAI2 Format – Transaction Detail – 16

* Record Code – 16
* Type Code – details data type* – indicates the type of balance (Summary/Transaction) being reported. – in this record type Transaction Detail codes only are used
* Amount
* Funds Type*
* Bank Reference – bank assigned reference to help identify the transaction
* Customer Reference – as corporates, this is the field we’re interested in. It should contain our reference for reconciliation purposes
* Text

# BAI2 Format – Continuation Record – 88

If the data in any record type exceeds the physical record size, or if required for any other reason the 88 record type can be used to continue the previous record. A record type 88 can only follow a record type 03 (Account Identifier), 16 (Transaction Detail) 0r 88 (Continuation Record)

    Record Code – 88
    Next field

# BAI2 Format – Account Trailer – 49

    Record Code – 49
    Account Control Total – Sum of all the Amount fields in the preceding 03 (Account Identifier) and all 16 (Transaction Detail) records
    Number of Records – Total number of records for the account – including the 03, all 16 and 88 records and this 49 record

# BAI2 Format – Group Trailer – 98

    Record Code – 98
    Group Control Total – Sum of all control totals in this group
    Number of Accounts – The number of 03 records in this group
    Number of records – The number of records in this group – including the 02, all 03, 16, 49 and 88 records, and this 98 record

# BAI2 Format – File Trailer – 99

    Record Code – 99
    File Control Total – Sum of all control totals in the file
    Number of Groups – The number of 02 records in this file
    Number of Records – Total number of records in this file, including this 99 record
