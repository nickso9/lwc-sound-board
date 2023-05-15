public without sharing class BoardAudioController {
    @AuraEnabled(cacheable=true)
    public static List<Board_Audio__c> getBoardAudio(String soundboardId) {
        String searchString = '%' + soundboardId + '%';
        try {
            return [SELECT Id, Sound__r.Name, Sound__r.Audio_Src__c, Sound__r.Audio_URL__c, Sound__r.Audio_IMG__c from Board_Audio__c  Where Soundboard__c = :soundboardId];
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }  
    }
}