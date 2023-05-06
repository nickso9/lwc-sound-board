


public with sharing class SoundController {
    
    @AuraEnabled(cacheable=true)
    public static List<Sound__c> getSoundList(String searchKey) {
        String searchString = '%' + searchKey + '%';
        return [SELECT Id, Name, Audio_Src__c, Audio_IMG__c from Sound__c  Where Name Like :searchString Limit 5];
    }
    
    @AuraEnabled
    public static Sound__c createSound(String name, String audioDocumentId, String imageDocumentId, String soundboardId) { 
        ContentVersion audioFileId = returnFileId(audioDocumentId);
        ContentVersion imageFileId = returnFileId(imageDocumentId);

        String audioPublicUrl = createContentDistribution(name, audioFileId.id);
        String imagePublicUrl = createContentDistribution(name, imageFileId.id);

        Sound__c newSound = new Sound__c(
            Audio_IMG__c = imagePublicUrl,
            Audio_URL__c = audioPublicUrl,
            Name = name
        );
        insert newSound;

        Board_Audio__c newBoardAudio = new Board_Audio__c(
            Soundboard__c = soundboardId,
            Sound__c = newSound.Id,
            Name = newSound.Name
        );
        insert newBoardAudio;

        return newSound;  
    }

    private static ContentVersion returnFileId(String docId) {
        return [Select Id, Title From ContentVersion Where ContentDocumentId = :docId];
    }

    private static String createContentDistribution(String Title, String id) {
        ContentDistribution newContent = new ContentDistribution(Name = Title, ContentVersionId = id,
        PreferencesAllowViewInBrowser = true);
        insert newContent;
        ContentDistribution publicUrl = [Select DistributionPublicUrl from ContentDistribution Where id = :newContent.Id];
        return publicUrl.DistributionPublicUrl;
    }
}

