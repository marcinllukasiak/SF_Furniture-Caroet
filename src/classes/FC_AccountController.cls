public class FC_AccountController {
    @AuraEnabled
    public static List<Account> findAll() {
    return [SELECT Id, Name,Active__c,City__c,Phone,Fax, Location__Latitude__s, Location__Longitude__s,
            FROM Account
            WHERE Location__Latitude__s != NULL AND Location__Longitude__s != NULL
            LIMIT 50];
    }


    @AuraEnabled
    public static List<Account> findByNameAndCity(String searchWordString) {

        String query ='SELECT Id, Name,Active__c,City__c,Phone,Fax, Location__Latitude__s, Location__Longitude__s FROM Account'+
                ' WHERE Location__Latitude__s != NULL AND Location__Longitude__s != NULL AND Name Like \'' + searchWordString + '%\'';
//        return [SELECT id, name, Location__Latitude__s, Location__Longitude__s
//        FROM Account
//        WHERE Location__Latitude__s != NULL AND Location__Longitude__s != NULL
//        AND Name = 'Partner 1'
//        LIMIT 50];
        System.debug('Query ' + query);
        return Database.query(query);
//        AND ( Name = :searchWordString OR City__c = :searchWordString )
    }
}