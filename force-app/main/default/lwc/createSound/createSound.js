import { LightningElement, api } from 'lwc';
import createSound from "@salesforce/apex/SoundController.createSound";
import PLACEHOLDER_IMAGE from "@salesforce/resourceUrl/imagePlaceholder";

export default class CreateSound extends LightningElement {
    placeholderImg = PLACEHOLDER_IMAGE;
    audioDocumentId;
    imageDocumentId;
    audioLibrary = '058Do000000kF82IAE';
    imageLibrary = '058Do000000kFGCIA2';
    soundName = ""
    @api soundboardId


    get acceptedAudioFormats() {
        return ['.mp3'];
    }

    get acceptedImageFormats() {
        return ['.png', '.jpg', '.gif', '.jpeg'];
    }

    handleUploadFinished(event) {
        const files = event.detail.files;
        if (files[0].mimeType.includes('image')) {
            console.log('image was uploaded')
            this.imageDocumentId = files[0].documentId
            const imageCheckBox = this.template.querySelector(".sound-image-checkbox");
            this.checkAndDisableHandler(imageCheckBox, "add");
        } else if (files[0].mimeType.includes('audio')) {
            console.log('audio was uploaded')
            this.audioDocumentId = files[0].documentId;
            const audioCheckBox = this.template.querySelector(".sound-file-checkbox");
            this.checkAndDisableHandler(audioCheckBox, "add");
        }
        // console.log(JSON.parse(JSON.stringify(event.detail.files)))
        console.log('uploaded files');

        // console.log(files[0].documentId)
        // console.log('uploaded files123');
    }

    nameHandler(event) {
        this.soundName = event.target.value;
        const nameCheckBox = this.template.querySelector(".sound-name-checkbox");
        if (this.soundName.length > 3) {
            this.checkAndDisableHandler(nameCheckBox, "add");
        } else {
            this.checkAndDisableHandler(nameCheckBox, "remove");
        }
    }

    checkAndDisableHandler(element, action) {
        const createSoundButton = this.template.querySelector('.create-sound-button');
        if (action === 'add') {
            element.nextElementSibling.firstChild.classList.add('success');
        } else if (action === 'remove') {
            element.nextElementSibling.firstChild.classList.remove('success');
        }
        if (this.audioDocumentId && this.imageDocumentId && this.soundName.length > 3) {
            console.log('make it through ' + createSoundButton.disabled)
            if (createSoundButton.disabled) {
                createSoundButton.disabled = false;
            }
        } else {
            if (!createSoundButton.disabled) {
                createSoundButton.disabled = true;
            }
        }
    }

    handleSoundCancel() {
        // apex to delete document ids
    }

    async createSoundHandler(e) {
        console.log('create sound')
        const soundObj = {
            audioDocumentId: this.audioDocumentId,
            imageDocumentId: this.imageDocumentId,
            soundboardId: this.soundboardId,
            name: this.soundName
        };
        // console.log(soundObj);    
        if (soundObj.audioDocumentId && soundObj.imageDocumentId && soundObj.name && soundObj.name) {
            console.log('creating sound')
            // try {
            //     // const result = await createSound({name, audioDocumentId, imageDocumentId, soundboardId});
            //     const result = await createSound({ ...soundObj });

            //     console.log(result)
            // } catch (error) {
            //     console.log(error);
            // }
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