import { LightningElement } from 'lwc';
import {NavigationMixin} from "lightning/navigation";

export default class Logout extends NavigationMixin(LightningElement) {


    handleLogout(){
        this[NavigationMixin.Navigate]({
            type: 'comm__loginPage',
            attributes: {
                actionName: 'logout'
            }
        });
    }
}