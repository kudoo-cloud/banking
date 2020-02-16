We will use [iban.js](https://github.com/arhs/iban.js) to validate IBAN

First we want to test the Westpac scenario which is:

Funding Account 032134 407101
Direct Entry Facility 536826 (self-balancing)
DERPS Account for new DE Facility 032797 242627
PPS ID Allocated GN000147
PPS Preferred Name RHCI Pharmacy PPS 
Can you please provide a file to include the different payment methods requested
•	Cheque payments – 
•	cheques printed and posted to Beneficiary Next day 
•	Printed and Returned to you, Next Day
•	Direct Credit payments
•	Email remittance Advice  
•	Faxed Remittance Advice
•	Printed and posted to Beneficiary
As part of the testing you are completing for WIBS can you also send a DE test file using DE ID 536826 ( this is to make sure we can say that all DE IDs including the new one created have been tested)

So first we'll need to generate a Payment for this account to make:

# TODO:
Need to add another screen to `banking` for `Westpac`. IF should be similar to the Integration screen, where we want to link a Bank account to `Advanced banking`. Then in that screen we need the following fields
* Westpac Customer ID
* Remitter Name