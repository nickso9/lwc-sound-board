import { LightningElement, wire } from 'lwc';
import Id from '@salesforce/user/Id'
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import AccountId from "@salesforce/schema/User.AccountId"
import Alias from "@salesforce/schema/User.Alias"
import Name from "@salesforce/schema/User.Name"
import ACCOUNT from "@salesforce/schema/User.Account.Soundboard__c"
const FIELDS = [Name, Alias, AccountId, ACCOUNT];

export default class Soundboard extends LightningElement {

    @wire(getRecord, { recordId: '005Do0000023NbZIAU', fields: FIELDS})
    accountHandler({data, error}) {
        if(data) {
            console.log(data);
        } else {
            console.log('error occurred : ' + error)
        }
    }



    // connectedCallback() {
    //     console.log(Id);
    //     console.log('hihihi')
    //     console.log(this.account.data);
    // }
 
    // renderedCallback() {
    //     console.log(Id);
    //     console.log('heyhey')
    //     console.log(this.account.data);
        // const n = getFieldValue(this.account.data, Name)
        // const a = getFieldValue(this.account.data, AccountId)
        // const l = getFieldValue(this.account.data, Alias)

        // console.log(n)
        // console.log(a)
        // console.log(l)
        
    // }
    

}