public with sharing class SoundController {
    @AuraEnabled(cacheable=true)
    public static List<Sound__c> getSoundList(String searchKey) {
        String searchString = '%' + searchKey + '%';
        return [SELECT Id, Name, Audio_Src__c, Audio_IMG__c from Sound__c  Where Name Like :searchString Limit 5];
    }
    public static void removedSound(String id) {
        
    }
}