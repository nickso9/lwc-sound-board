import { LightningElement, api } from 'lwc';
import BOARD_AUDIO_OBJECT from "@salesforce/schema/Board_Audio__c";

export default class Searchcard extends LightningElement {
    @api sound;
    @api soundboardId;

    playHandler(event) {
        // console.log(this.soundboardId)
        const currentEle = event.currentTarget;
        const parent = currentEle.parentElement;
        const audio = parent.firstElementChild;
        // console.log(audio)
        audio.play()
    }

    addSound() {
        const recordInpupt = {
            apiName: BOARD_AUDIO_OBJECT.objectApiName,
            fields: {
                Sound__c: this.sound.id,
                Name: this.sound.name
            }
        }
        const closeEvt = new CustomEvent('addsound', {
            detail: recordInpupt,
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(closeEvt);
    }

    createAudioBoardSound() {

    }



}