/**
 * Created by Marcin Łukasiak on 2017-12-08.
 */

public with sharing class FCC_ProductsController {

    @AuraEnabled
    public static List<Product2> findProducts() {
        return [
                SELECT Id,Name,DisplayUrl,Description,product_rating__c
                FROM Product2
                LIMIT 50
        ];
    }

    @AuraEnabled
    public static List<Attachment> getIdAttachment(String idParent) {
        return [
                SELECT Id
                FROM Attachment
                WHERE ParentId = :idParent
                ORDER BY CreatedDate ASC
                LIMIT 1
        ];
    }
    @AuraEnabled
    public static List<PricebookEntry> getPricebookEntry(String idProduct) {

        return [
                Select UnitPrice
                FROM PricebookEntry
                WHERE Product2Id = :idProduct
                AND Pricebook2Id = '01s0O000003a6BiQAI'
        ];
    }
}