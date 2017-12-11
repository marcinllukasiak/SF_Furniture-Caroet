/**
 * Created by Marcin Łukasiak on 2017-12-11.
 */
({
    doInit : function(component, event) {
            var action = component.get("c.getIdAttachment");
            action.setParam("idParent",component.get("v.product.Id"))
            action.setCallback(this, function(a) {
                var attachments = a.getReturnValue();
                    if(attachments.length > 0){
                        component.set("v.attachmentID", attachments[0].Id);
                    }else{
                        component.set("v.attachmentID", '00P0O00001DYDt3UAH');
                    }
            });
       $A.enqueueAction(action);

       var action = component.get("c.getPricebookEntry");
                   action.setParam("idProduct",component.get("v.product.Id"))
                   action.setCallback(this, function(a) {
                       var pricebookEntry = a.getReturnValue();
                           if(pricebookEntry.length > 0){
                               component.set("v.priceProduct", pricebookEntry[0].UnitPrice);
                           }else{
                               component.set("v.priceProduct", '99999999');
                           }
                   });
              $A.enqueueAction(action);
    },
    addToBasket : function(component, event) {
        var event = $A.get("e.c:FCC_ProductToBasket");
        console.log("UstawianyProdukt");
        console.log(component.get("v.product"));

        event.setParams({"product": component.get("v.product")});
        event.fire();
    }
})