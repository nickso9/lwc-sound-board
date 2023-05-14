import { LightningElement, api } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
// import removedSound from "@salesforce/apex/SoundController.removedSound";

export default class Soundcard extends LightningElement {
    @api sounds;

    async actionHandler(event) {

        if (event.target) {
            const currentEle = event.currentTarget
            const action = currentEle.getAttribute("data-action")
    
            if (action && action === "play") {
                const audio = currentEle.firstElementChild;
                audio.play()
            }
    
            if (action && action === "delete") {
                console.log("delete now")
                const parent = currentEle.parentElement;
                const soundElemId = parent.id;
                const soundId = soundElemId.slice(0, 18);

                const deleteEvt = new CustomEvent('deletesound', {
                    detail: {
                        id: soundId
                    },
                    bubbles: true,
                    composed: true
                });
                this.dispatchEvent(deleteEvt);
                // try {
                //     await deleteRecord(soundId);
                //     this.dispatchEvent(new CustomEvent('refreshcard'));
                // } catch (error) {
                //     console.log(JSON.stringify(error));
                // }
            }
        }   
    }
}