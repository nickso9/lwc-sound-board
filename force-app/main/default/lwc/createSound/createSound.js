import { LightningElement, api } from 'lwc';

export default class CreateSound extends LightningElement {

    @api documentId;
    audioLibrary = '058Do000000kF82IAE';

    get audioLibrary() {
        return this.audioLibrary
    }

    get acceptedFormats() {
        return ['.mp3'];
    }

    handleUploadFinished(event) {
        console.log('uploaded files');
        const files = event.detail.files;
        console.log(files[0].documentId)
        this.documentId = files[0].documentId
        console.log('uploaded files123');
    }

    // test(data) {
    //     // console.log('test : ' + data);
    //     // this.documentId = data;
    // }

    handleSoundCancel() {

    }
}