import { LightningElement, api} from 'lwc';

export default class Soundcard extends LightningElement {
    @api sounds;

    audioHandler(event) {
    
        const currentEle = event.currentTarget
        const action = currentEle.getAttribute("data-action")

        if (action === "play") {
            const audio = currentEle.firstElementChild;
            audio.play()
        }

        if (action === "delete") {
            console.log("delete now")
            const parent = currentEle.parentElement;
            console.log(parent.id);
            console.log(parent)
        }

    }
    

}