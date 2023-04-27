import { LightningElement, wire } from 'lwc';
import Id from '@salesforce/user/Id'
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import AccountId from "@salesforce/schema/User.AccountId"
import Alias from "@salesforce/schema/User.Alias"
import Name from "@salesforce/schema/User.Name"
import ACCOUNT from "@salesforce/schema/User.Account.Soundboard__c";
import SOUNDBOARD_ID from "@salesforce/schema/User.Account.Soundboard__r.Id";

import IMG_URL from "@salesforce/schema/Sound__c.Audio_IMG__c";
import AUDIO_URL from "@salesforce/schema/Sound__c.Audio_URL__c";

const USER_FIELDS = [Name, Alias, AccountId, ACCOUNT, SOUNDBOARD_ID];


export default class Soundboard extends LightningElement {

    recordId = '005Do0000023NbZIAU'
    soundboardId;

    @wire(getRecord, { recordId: '$recordId', fields: USER_FIELDS })
    accountHandler({ data, error }) {
        if (data) {
            // console.log(data);
            this.soundboardId = getFieldValue(data, SOUNDBOARD_ID)
            // this.soundboardId = data.fields.Account.value.fields.Soundboard__c.value;
        } else {
            console.log('error occurred : ' + error)
        }
    }

    @wire(getRelatedListRecords, {
        parentRecordId: '$soundboardId',
        relatedListId: 'Board_Audios__r',
        fields: ['Board_Audio__c.Id', 'Board_Audio__c.Name', 'Board_Audio__c.Sound__r.Audio_IMG__c', 'Board_Audio__c.Sound__r.Audio_URL__c'],
        sortBy: ['Board_Audio__c.Name']
    })
    relatedSoundHandler({ data, error }) {
        if (data) {
            this.setSounds(data.records);
        } else {
            console.log(error)
        }
    }

    setSounds(data) {
        const totalSounds = data.length;
        // console.log(data);
        const sounds = [...data];
        // console.log(IMG_URL)
        for (let i = 0; i < totalSounds; i++) {
            const { Sound__r: sound } = sounds[i].fields;
            // console.log(sound)
            const audio = getFieldValue(sound.value, AUDIO_URL);
            const img = getFieldValue(sound.value, IMG_URL);
            console.log(audio);
            console.log(img);
        }
    }


}