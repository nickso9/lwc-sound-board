import { LightningElement, api} from 'lwc';

export default class Soundcard extends LightningElement {
    @api sounds;

    audioHandler(event) {
        const id = "#" + event.currentTarget.id;
        const audioContainer = this.template.querySelector(id);
        const audio = audioContainer.firstElementChild
        audio.play();
    }
}