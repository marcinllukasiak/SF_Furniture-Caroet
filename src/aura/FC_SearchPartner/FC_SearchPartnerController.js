({

    valueChange:function(component, event){
         console.log('update ' + component.get("v.searchWorld"));
    },
    searchPartner : function(component, event) {
       var world = component.get("v.searchWorld");
        var action = component.get("c.findByNameAndCity");
        action.setParam('searchWordString',world);

        console.log('Search wuszikuje ' + component.get("v.searchWorld"));

        action.setCallback(this, function(a) {
            console.log('Wartosc pobrana z imput ' + component.get("v.searchWorld"));
            console.log('Wyszukales ' + a.getReturnValue);
            component.set("v.accounts", a.getReturnValue());

            window.setTimeout($A.getCallback(function() {
                var event = $A.get("e.c:FC_AccountsLoaded");
                event.setParams({"accounts": a.getReturnValue()});
                event.fire();

                var event2 = $A.get("e.c:FC_isShowComponent");
                event2.setParams({"isShow": false});
                event2.fire();

            }), 500);
        });
    $A.enqueueAction(action);
    },


})