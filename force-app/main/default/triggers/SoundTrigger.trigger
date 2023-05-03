trigger SoundTrigger on Sound__c (before insert) {


    // ContentVersion file = [Select Id, Title From ContentVersion Where ContentDocumentId = '069Do000004BdplIAC'];
    // System.debug(file);
    
    // insert new ContentDistribution(
    // Name = file.Title,
    // ContentVersionId = file.id,
    //     PreferencesAllowViewInBrowser = true
    // );

    /**this gives  */
    // Select Id, ContentVersionId, ContentDownloadUrl, Name from ContentDistribution

    if(Trigger.isBefore) {
        if(Trigger.isInsert) {
            For(Sound__c acc:Trigger.new) {


            }
        }
    }     
}