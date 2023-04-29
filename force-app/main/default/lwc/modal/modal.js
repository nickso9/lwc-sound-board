import { LightningElement } from 'lwc';

export default class Modal extends LightningElement {

    closeModal() {
        const closeEvt = new CustomEvent('close', { bubbles:true, composed:true });
        this.dispatchEvent(closeEvt);
    }

}