/**
 * Created by Marcin Łukasiak on 2017-12-08.
 */
({
    doInit : function(component, event) {
        var action = component.get("c.findProducts");
        action.setCallback(this, function(a) {
            component.set("v.products", a.getReturnValue());
            console.log(a.getReturnValue());
            //window.setTimeout($A.getCallback(function() {
              //  var event = $A.get("e.c:AccountsLoaded");
                //event.setParams({"products": a.getReturnValue()});
                //event.fire();
         //   }), 500);
        });
    $A.enqueueAction(action);

    var myEvent = component.getEvent("change");
            myEvent.setParams({"rating": 3});
            myEvent.fire();
    },
})