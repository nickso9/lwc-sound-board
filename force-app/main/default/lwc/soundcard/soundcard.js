import { LightningElement, api } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
// import removedSound from "@salesforce/apex/SoundController.removedSound";

export default class Soundcard extends LightningElement {
    @api sounds;

    async actionHandler(event) {

        const currentEle = event.currentTarget
        const action = currentEle.getAttribute("data-action")

        if (action === "play") {
            const audio = currentEle.firstElementChild;
            audio.play()
        }

        if (action === "delete") {
            console.log("delete now")
            const parent = currentEle.parentElement;
            const soundElemId = parent.id;
            const soundId = soundElemId.slice(0, 18);
            try {
                const deletedRecord = await deleteRecord(soundId)
                console.log(deletedRecord)
                this.dispatchEvent(new CustomEvent('refreshcard'));
            } catch (error) {
                console.log(error);
            }
        }

    }


}