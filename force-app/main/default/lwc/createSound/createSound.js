import { LightningElement, api } from 'lwc';
import createSound from "@salesforce/apex/SoundController.createSound";

export default class CreateSound extends LightningElement {

    // audioDocumentId;
    // imageDocumentId;
    audioLibrary = '058Do000000kF82IAE';
    imageLibrary = '058Do000000kFGCIA2';
    soundName = ""
    @api soundboardId

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

    nameHandler(event) {
        this.name = event.target.value;
    }

    handleSoundCancel() {

    }

    async createSoundHandler(e) {

        const soundObj = {
            audioDocumentId: this.audioDocumentId,
            imageDocumentId: this.imageDocumentId,
            soundboardId: this.soundboardId,
            name: this.name
        };
        // console.log(soundObj);
        try {
            // const result = await createSound({name, audioDocumentId, imageDocumentId, soundboardId});
            const result = await createSound({...soundObj});

            console.log(result)
        } catch (error) {
            console.log(error);
        }
        
    
    }
}

/**
 * 
 * DELETE FROM ContentDocument WHERE OwnerId = '005Do0000023MItIAM'
 * audio : 069Do000004BrpbIAC
 * image : 069Do000004BrpcIAC
 * 
 */