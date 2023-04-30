import { LightningElement, api} from 'lwc';

export default class Soundcard extends LightningElement {
    @api sounds;

    audioHandler(event) {
    
        const audio = event.currentTarget.closest('audio');
        console.log(event.currentTarget.firstChild.children[1])
        // const id = "#" + event.currentTarget.id;
        // const audioContainer = this.template.querySelector(id);
        // const audio = audioContainer.firstElementChild
        // audio.play();
    }
}