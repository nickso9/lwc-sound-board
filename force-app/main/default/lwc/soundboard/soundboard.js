import { LightningElement, wire, track } from 'lwc';
import Id from '@salesforce/user/Id'
import { getRecord, getFieldValue, createRecord } from 'lightning/uiRecordApi';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
// import { RefreshEvent } from 'lightning/refresh';
import { refreshApex } from '@salesforce/apex';

import AccountId from "@salesforce/schema/User.AccountId"
import Alias from "@salesforce/schema/User.Alias"
import Name from "@salesforce/schema/User.Name"
import ACCOUNT from "@salesforce/schema/User.Account.Soundboard__c";
import SOUNDBOARD_ID from "@salesforce/schema/User.Account.Soundboard__r.Id";

import IMG_URL from "@salesforce/schema/Sound__c.Audio_IMG__c";
import AUDIO_URL from "@salesforce/schema/Sound__c.Audio_Src__c";
import SOUND_NAME from "@salesforce/schema/Sound__c.Name";
import SOUND_ID from "@salesforce/schema/Board_Audio__c.Id";

import getSoundList from "@salesforce/apex/SoundController.getSoundList";

const USER_FIELDS = [Name, Alias, AccountId, ACCOUNT, SOUNDBOARD_ID];


export default class Soundboard extends LightningElement {

    recordId = '005Do0000023NbZIAU'
    soundboardId;
    sounds = [];
    searchKey;
    showModal = false;
    isMadeSearch = false;
    isAddSound = false;

    searchedSounds = [];

    @wire(getRecord, { recordId: '$recordId', fields: USER_FIELDS })
    accountHandler({ data, error }) {
        if (data) {
            // console.log(data);
            console.log('wire get record')
            this.soundboardId = getFieldValue(data, SOUNDBOARD_ID)
            // this.soundboardId = data.fields.Account.value.fields.Soundboard__c.value;
        } else {
            console.log('error occurred : ' + error)
        }
    }

    _wiredRelatedData;
    @wire(getRelatedListRecords, {
        parentRecordId: '$soundboardId',
        relatedListId: 'Board_Audios__r',
        fields: ['Board_Audio__c.Id', 'Board_Audio__c.Sound__r.Name', 'Board_Audio__c.Sound__r.Audio_IMG__c', 'Board_Audio__c.Sound__r.Audio_Src__c'],
        sortBy: ['Board_Audio__c.Sound__r.Name']
    })
    relatedSoundHandler(relatedSounds) {
        this._wiredRelatedData = relatedSounds
        const { data, error } = relatedSounds;
        if (data) {
            // console.log(JSON.parse(JSON.stringify(data)));
            // this.sounds = data;
            console.log('wire get related records')
            this.setSounds(data.records);
        } else {
            console.log(error)
        }
    }

    setSounds(data) {
        console.log('set sounds')
        const totalSounds = data.length;
        // console.log(data);
        const sounds = [...data];
        const tempSound = [];
        for (let i = 0; i < totalSounds; i++) {
            const { Sound__r: sound } = sounds[i].fields;
            const audio = getFieldValue(sound.value, AUDIO_URL);
            const img = getFieldValue(sound.value, IMG_URL);
            const name = getFieldValue(sound.value, SOUND_NAME);
            const id = getFieldValue(sounds[i], SOUND_ID)
            tempSound.push({ id, name, img, audio });
        }
        // console.log(JSON.parse(JSON.stringify(tempSound)));
        this.sounds = tempSound;
        console.log(JSON.parse(JSON.stringify(this.sounds)));
        // console.log(this.sounds)
    }


    handleInputChange(event) {
        this.searchKey = event.target.value;
    }

    closeHandler() {
        console.log('close modal')
        
        
        // eval("$A.get('e.force:refreshView').fire();");
        this.showModal = false;
        if (this.isMadeSearch) {
            this.isMadeSearch = false;
            this.searchKey = "";
            this.template.querySelector("input").value = "";
        }
        if (this.isAddSound) this.isAddSound = false;

        setTimeout(()=> {
            console.log('refreshing')
            eval("$A.get('e.force:refreshView').fire();");
            // eval("$A.get('e.force:refreshView').fire();");
            // return refreshApex(this._wiredRelatedData)
        },1000);
        setTimeout(()=> {
            console.log('refreshing')
            eval("$A.get('e.force:refreshView').fire();");
            // eval("$A.get('e.force:refreshView').fire();");
            // return refreshApex(this._wiredRelatedData)
        },2000);
        // this.dispatchEvent(new RefreshEvent());
    }

    addsoundHandler(event) {
        const boardAudio = {
            apiName: event.detail.apiName,
            fields: { ...event.detail.fields, Soundboard__c: this.soundboardId }
        }
        // console.log(boardAudio)
        createRecord(boardAudio)
            .then((result) => {
                // console.log(result);
                // console.log('refreshing')
                // // const tempSound = this.sounds;
                // const audio = getFieldValue(result, AUDIO_URL);
                // const img = getFieldValue(result, IMG_URL);
                // const name = getFieldValue(result, SOUND_NAME);
                // const id = getFieldValue(result, SOUND_ID)
                // const test = { id, name, img, audio }
                // // tempSound.push({ id, name, img, audio });
                // console.log(test)
                // console.log('asdasd')
                // this.sounds = tempSound;
                // console.log(this.provisionedValue)
                // refreshApex(this.provisionedValue)
                // return refreshApex(this.provisionedValue)
                // refreshApex(this.provisionedValueOne)
                // setTimeout(() => {
                //     window.location.reload();
                //     // this.closeHandler()
                // }, 1000)
                return refreshApex(this._wiredRelatedData)
            })
            .then((e) => {
                console.log('refreshed in addosundhandler')
            //     this.closeHandler()
            })
            .catch((error) => {
                console.log(error);
            })
    }


    async handleSearch() {
        this.isMadeSearch = true;
        this.showModal = true;
        if (!this.searchKey) {
            return this.searchedSounds = [];
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
                        audio: item.Audio_Src__c
                    }
                });
                // console.log('returned sounds ' + JSON.stringify(returnedSounds))
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleAddSound() {
        this.isAddSound = true;
        this.showModal = true;
    }
}