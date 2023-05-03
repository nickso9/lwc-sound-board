import { LightningElement } from 'lwc';

export default class CreateSound extends LightningElement {

    audioDocumentId;
    imageDocumentId;
    audioLibrary = '058Do000000kF82IAE';
    imageLibrary = '058Do000000kFGCIA2';

    get imageLibrary() {
        return this.imageLibrary;
    }

    get audioLibrary() {
        return this.audioLibrary;
    }

    get acceptedAudioFormats() {
        return ['.mp3'];
    }

    get acceptedImageFormats() {
        return ['.png', '.jpg', '.gif'];
    }

    handleUploadFinished(event) {
        const files = event.detail.files;
        if (files[0].mimeType.includes('image')) {
            console.log('image was uploaded')
            this.imageDocumentId = files[0].documentId

        } else if (files[0].mimeType.includes('audio')) {
            console.log('audio was uploaded')
            this.audioDocumentId = files[0].documentId;

        }
        // console.log(JSON.parse(JSON.stringify(event.detail.files)))
        console.log('uploaded files');
    
        // console.log(files[0].documentId)
        // console.log('uploaded files123');
    }

    handleSoundCancel() {

    }
}

/**
 * 
 * DELETE FROM ContentDocument WHERE OwnerId = '005Do0000023MItIAM'
 * 
 * 
 */