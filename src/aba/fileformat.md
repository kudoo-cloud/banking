# ABA Format File Details

Each line in an ABA file is a "record". An ABA file has three main records, 
* the "descriptive" record, 
* a "detail" record for each transaction and 
* the "file total record" at the end. 
 

The first character position of each new record indicates what type of record it is. An ABA record is exactly 120 characters long (excluding new line characters).

## Descriptive record (type 0)
Char Pos 	Field Size 	    Field Description 	                    Specification
1 	        1 	            Record Type 0 	                        Must be '0'
2-18 	    17 	            Blank 	                                Must be filled.
19-20 	    2 	            Reel Sequence Number 	                Must be numeric commencing at 01.
                                                                    Right justified. Zero filled.
21-23 	    3 	            Name of User's Financial Institution 	Must be approved Financial Institution abbreviation. Bank of Queensland's                                                                               abbreviation is BQL, Westpac's abbreviation is "WBC". Consult your Bank for correct                                                                     abbreviation.
24-30 	    7 	            Blank 	                                Must be blank filled.
31-56 	    26 	            Name of Use supplying file 	            Must be User Preferred Specification as advised by User's FI. Left justified, blank                                                                     filled. All coded character set valid. Must not be all blanks.
57-62 	    6 	            Name of Use supplying file 	            Must be User Identification Number which is allocated by APCA. Must be numeric,                                                                         right justified, zero filled.
63-74 	    12 	            Description of entries on file  	    All coded character set valid. Must not be all blanks. Left justified, blank filled.
75-80 	    6 	            Date to be processed  	                Must be numeric in the formal of DDMMYY. Must be a valid date. Zero filled.
81-120 	    40 	            Blank 	                                Must be blank filled.

Note: all unused fields must be blank filled

# Detail Record (type 1)
Char Pos 	Field Size 	    Field Description 	                    Specification
1 	        1 	            Record Type 1 	                        Must be '1'
2-8 	    7 	            Bank/State/Branch Number 	            Must be numeric with hyphen in character position 5. Character positions 2 and 3                                                                        must equal valid Financial Institution number. Character position 4 must equal a                                                                        valid state number (0-9). For credits to Employee Benefits Card accounts, field                                                                         must always contain BSB 032-898
9-17 	    9 	            Account number to be credited/debited 	Numeric, hyphens and blanks only are valid. Must not contain all blanks (unless a credit card transaction) or zeros. Leading zeros which are part of a valid account number must be shown, e.g. 00-1234.

Where account number exceeds nine characters, edit out hyphens. Right justified, blank filled. For credits to Employee Benefits Card accounts, Account Number field must always be 999999
18 	1 	Indicator 	"N" – for new or varied Bank/State/Branch number or name details, otherwise blank filled.
Withholding Tax Indicators:
"W" – dividend paid to a resident of a country where a double tax agreement is in force.
"X" – dividend paid to a resident of any other country.
"Y" – interest paid to all non-residents.
The amount of withholding tax is to appear in character positions 113-120.
Note: Where withholding tax has been deducted the appropriate Indicator as shown above is to be used and will override the normal indicator.
19-20 	2 	Transaction Code 	For most transactions this will be 53. A full list of compatible transaction codes are listed below.
21-30 	10 	Amount 	Only numeric valid. Must be greater than zero. Shown in cents without punctuations. Right justified, zero filled. Unsigned.
31-62 	32 	Title of Account to be credited/debited 	All coded character set valid. Must not be all blanks. Left justified, blank filled.
Desirable Format for Transaction Account credits:
   -  Surname (period)
       Blank
   -  given name with blanks between each name
63-80 	18 	Lodgement Reference 	All coded character set valid. Field must be left justified, and contain only the 16 character Employee Benefits Card number; for example 5550033890123456.
No leading spaces, zeroes, hyphens or other characters can be included.
81-87 	7 	Trace Record
(BSB Number in format XXX-XXX) 	Bank (FI)/State/Branch and account number of User to enable retracing of the entry to its source if necessary. Only numeric and hyphens valid. Character positions 81 & 82 must equal a valid Financial Institution number. Character position 83 must equal a valid State number (0-9). Character position 84 must be a hyphen.
88-96 	9 	(Account number) 	Right justified, blank filled.
97-112 	16 	Name of Remitter 	Name of originator of the entry. This may vary from Name of the User. All coded character set valid. Must not contain all blanks. Left justified, blank filled.
113-120 	8 	Amount of Withholding Tax 	Numeric only valid. Show in cents without punctuation. Right justified, zero filled. Unsigned.
Note: all fields must be completed

# File Total Record (type 7)
Char Pos 	Field Size 	Field Description 	Specification
1 	1 	Record Type 7 	Must be '7'
2-8 	7 	BSB Format Filler 	Must be '999-999'
9-20 	12 	Blank 	Must be blank filled.
21-30 	10 	File (User) Net Total Amount 	Numeric only valid. Must equal the difference between File Credit & File Debit Total Amounts. Show in cents without punctuation. Right justified, zero filled. Unsigned.
31-40 	10 	File (User) Credit Total Amount 	Numeric only valid. Must equal the accumulated total of credit Detail Record amounts. Show in cents without punctuation. Right justified, zero filled. Unsigned.
41-50 	10 	File (User) Debit Total Amount 	Numeric only valid. Must equal the accumulated total of debit Detail Record amounts. Show in cents without punctuation. Right justified, zero filled. Unsigned.
51-74 	24 	Blank 	Must be blank filled.
75-80 	6 	File (user) count of Records Type 1 	Numeric only valid. Must equal accumulated number of Record Type 1 items on the file. Right justified, zero filled.
81-120 	40 	Blank 	Must be blank filled.
Note: all unused fields must be blank filled
Transaction codes

Generally you only need to use the transaction code "53 - Pay" in your ABA file, however valid codes are as follows. Note that some transaction codes are debits and others are credits, and some require withholding tax column to be filled.
Code 	Transaction Description
13 	Externally initiated debit items
50 	Externally initiated credit items with the exception of those bearing Transaction Codes
51 	Australian Government Security Interest
52 	Family Allowance
53 	Pay
54 	Pension
55 	Allotment
56 	Dividend
57 	Debenture/Note Interest
Integrate an ABA file export in your application

There are many accounting packages which can export an ABA file - but what if you have your own custom application? The Sydney based Web application guys at BlueChilli can develop an integrated solution for your application which will save you time and money - no more needless data entry!

# Breakdown of ABA
          11111111122222222223333333333444444444455555555556666666666
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
0                 01WBC       RPRS HEADER DE DEBIT      531932DE          030119   

          11111111122222222223333333333444444444455555555556666666666777777777788888888889999999999000000
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890                
1123-456 12345678 130000010000Symbion                         RPF-001491 VP00040032-000   986590Ramsay Pharmacy 00000000
1123-456 12345678 130000120000Symbion                         RPF-001491 VP00040032-000   986590Ramsay Pharmacy 00000000
1123-456   123456 1300002100003 P PTY LIMITED                 RPF-001491 VP00040033-157   511790Ramsay Pharmacy 00000000
1033-157   511790 500000340000Ramsay Pharmacy Franchisee      RPF-001491        033-157   511790Ramsay Pharmacy 00000000
          11111111122222222223333333333444444444455555555556666666666777777777788888888889999999999000000
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890  
7999-999            000000000000003400000000340000                        000004            