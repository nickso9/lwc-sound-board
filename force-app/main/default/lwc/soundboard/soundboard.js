import { LightningElement, wire, api } from 'lwc';
import USER_ID from '@salesforce/user/Id';
import { getRecord, getFieldValue, createRecord, deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import AccountId from "@salesforce/schema/User.AccountId"
import Alias from "@salesforce/schema/User.Alias"
import Name from "@salesforce/schema/User.Name"
import ACCOUNT from "@salesforce/schema/User.Account.Soundboard__c";
import SOUNDBOARD_ID from "@salesforce/schema/User.Account.Soundboard__r.Id";

// import IMG_URL from "@salesforce/schema/Sound__c.Audio_IMG__c";
// import AUDIO_URL from "@salesforce/schema/Sound__c.Audio_Src__c";
// import SOUND_NAME from "@salesforce/schema/Sound__c.Name";
// import SOUND_ID from "@salesforce/schema/Board_Audio__c.Id";

import getSoundList from "@salesforce/apex/SoundController.getSoundList";
import getBoardAudio from "@salesforce/apex/BoardAudioController.getBoardAudio";


const USER_FIELDS = [Name, Alias, AccountId, ACCOUNT, SOUNDBOARD_ID];


export default class Soundboard extends LightningElement {

    @api newRecordId;

    recordId = '005Do0000023NbZIAU'
    soundboardId;
    sounds = [];
    searchKey;
    showModal = false;
    isMadeSearch = false;
    isAddSound = false;

    searchedSounds = [];

    get allsounds() {
        return this.sounds.length ? this.sounds : "";
    }

    @wire(getRecord, { recordId: USER_ID, fields: USER_FIELDS })
    accountHandler({ data, error }) {
        if (data) {
            console.log('----')
            console.log(USER_ID)
            console.log(data);
            console.log('wire get record')
            this.soundboardId = getFieldValue(data, SOUNDBOARD_ID)
            // this.soundboardId = data.fields.Account.value.fields.Soundboard__c.value;
        } else {
            console.log('error occurred : ' + error)
        }
    }

    _wiredRelatedData;
    @wire(getBoardAudio, { soundboardId: '$soundboardId' })
    relatedSoundHandler(relatedSounds) {
        console.log(relatedSounds);
        console.log('grabbng sound ' + this.soundboardId)
        this._wiredRelatedData = relatedSounds
        const { data, error } = relatedSounds;
        if (data) {
            this.setSounds(data);
        } else {
            console.log('error')
            console.log(JSON.stringify(error))
        }
    }


    setSounds(data) {
        console.log('Setting sounds into board')
        const totalSounds = data.length;
        const tempSound = [];
        for (let i = 0; i < totalSounds; i++) {
            const sound = data[i]
            // const { Sound__r: sound } = sounds[i].fields;
            // const audio = getFieldValue(sound.value, AUDIO_URL);
            // const img = getFieldValue(sound.value, IMG_URL);
            // const name = getFieldValue(sound.value, SOUND_NAME);
            // const id = getFieldValue(sounds[i], SOUND_ID)
            const audio = sound.Sound__r.Audio_URL__c;
            const img = `background-image: url(${sound.Sound__r.Audio_IMG__c};`;
            const name = sound.Sound__r.Name;
            const id = sound.Id;
            tempSound.push({ id, name, img, audio });
        }
        this.sounds = tempSound;
        console.log(JSON.parse(JSON.stringify(this.sounds)));
    }


    handleInputChange(event) {
        this.searchKey = event.target.value;
    }

    refreshCard() {
        console.log('refresh card')
        setInterval(() => {
            refreshApex(this._wiredRelatedData);
        }, 1000)
    }

    closeHandler() {
        console.log('close modal')
        this.showModal = false;
        if (this.isMadeSearch) {
            this.isMadeSearch = false;
            this.searchKey = "";
            this.template.querySelector("input").value = "";
        }
        if (this.isAddSound) this.isAddSound = false;

    }

    addSoundHandler(event) {
        const boardAudio = {
            apiName: event.detail.apiName,
            fields: { ...event.detail.fields, Soundboard__c: this.soundboardId }
        }
        createRecord(boardAudio)
            .then((result) => {
                return this.refreshCard();
            })
            .then((e) => {
                console.log('refreshed in addosundhandler')
                this.showToast("Audio added to your soundboard","success");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteSoundHandler(event) {
        const soundIdToDelete = event.detail.id;
        console.log('deleting ' + soundIdToDelete)
        deleteRecord(soundIdToDelete)
            .then((result) => {
                return this.refreshCard();
            })
            .then((e) => {
                console.log('refreshed in delelte sound handler')
                this.showToast("Audio removed from your soundboard","error");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    async handleSearch() {
        this.searchedSounds = [];
        this.isMadeSearch = true;
        this.showModal = true;
        if (!this.searchKey) {
            return 
        }
        const returnedSounds = await getSoundList({ searchKey: this.searchKey });
        try {
            if (returnedSounds.length) {
                console.log('query')
                this.searchedSounds = returnedSounds.map(item => {
                    return {
                        name: item.Name,
                        id: item.Id,
                        img: item.Audio_IMG__c,
                        audio: item.Audio_URL__c,
                        createdBy: item.CreatedBy.Name
                    }
                });
            }
            console.log(returnedSounds);
        } catch (error) {
            console.log(error);
        }
    }

    handleAddSound() {
        this.isAddSound = true;
        this.showModal = true;
    }

    showToast(message, variant) {
        const evt = new ShowToastEvent({
            message: message,
            variant: variant,
            mode: "dismissable" // pester/sticky/dismissable
        });
        this.dispatchEvent(evt);
    }
}