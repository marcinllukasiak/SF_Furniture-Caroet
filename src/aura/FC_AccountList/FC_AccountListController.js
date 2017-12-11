({
    doInit : function(component, event) {
        var action = component.get("c.findAll");
        action.setCallback(this, function(a) {
            component.set("v.accounts", a.getReturnValue());

            window.setTimeout($A.getCallback(function() {
                var event = $A.get("e.c:FC_AccountsLoaded");
                event.setParams({"accounts": a.getReturnValue()});
                event.fire();
            }), 500);
        });
   $A.enqueueAction(action);
    },
    accountsLoaded: function(component, event, helper) {

            console.log('Lista zlapala Event' + event.getParam('accounts'));
            var accounts = event.getParam('accounts');
            component.set('v.accounts',accounts);
    },
    paintList: function(component, event, helper) {
            console.log("handle event paint 3");
             //clean colour items
             var items = document.getElementsByClassName("itemListToPaint");

             for (var i = 0; i < items.length; i++) {
               items[i].style.background = "white"; //white rebeccapurple
               items[i].style.color = "black"; //white black
             }

             //change colour select item
             var location = event.getParam('location');
             console.log('location =' + location + "=");
             var item = document.getElementById(location);
             item.style.background = "rebeccapurple"; //white rebeccapurple
             item.style.color = "white"; //white black
             //find account

            var accounts = component.get('v.accounts');
            var accountWithLocation;
            for (var i=0; i<accounts.length; i++) {
                var stringLocation ='' + accounts[i].Location__Latitude__s + ', ' + accounts[i].Location__Longitude__s;
                 if(stringLocation == location ){
                        accountWithLocation = accounts[i];

                 }

            }
            console.log('AFFFTER');
            console.log(accountWithLocation);
             var eventu = $A.get("e.c:FC_MapClickAccount");
             console.log("events " + eventu)
              eventu.setParams({"account": accountWithLocation});
              eventu.fire();
              console.log('Wyslano Map Click');
              console.log(accountWithLocation);

    },
    addPartner: function(component, event, helper) {
        var appEvent = $A.get("e.c:FC_showCreatePartner");
        appEvent.setParams({
                        "isShow" : true });
        appEvent.fire();



    },

    handlerAddPartner: function(component, event, helper) {

       var addAccount = event.getParam('account');
       var accounts = component.get('v.accounts');

        accounts.push(addAccount);
        component.set('v.accounts',accounts);

        // malowanie

         //clean colour items
         var items = document.getElementsByClassName("itemListToPaint");

         for (var i = 0; i < items.length; i++) {
           items[i].style.background = "white"; //white rebeccapurple
           items[i].style.color = "black"; //white black
         }

         //change colour select item
         setTimeout(function() {
                                var stringLocation ='' + addAccount.Location__Latitude__s + ', ' + addAccount.Location__Longitude__s;
                                  console.log('location =' + stringLocation + "=");
                                  var itemm = document.getElementById(stringLocation);
                                  console.log(itemm)

                                  itemm.style.background = "rebeccapurple"; //white rebeccapurple
                                  itemm.style.color = "white"; //white black
                     }, 1000);

         //find account

    },

    updateList : function(component, event, helper) {

            console.log('Lista zlapala edytowany account' + event.getParam('account'));
            console.log(event.getParam('account'));
            var editedAccount = event.getParam('account');
            var accounts = component.get('v.accounts');
            console.log("accounts ->");
            console.log(accounts);
            for (var i=0; i<accounts.length; i++) {
                 if(editedAccount.fields.Id.value == accounts[i].Id ){
                     accounts[i].Name = editedAccount.fields.Name.value ;
                     accounts[i].Active__c = editedAccount.fields.Active__c.value ;
                     accounts[i].City__c = editedAccount.fields.City__c.value ;
                     accounts[i].Phone = editedAccount.fields.Phone.value ;
                     accounts[i].Fax = editedAccount.fields.Fax.value ;
                     console.log('fire Helper BackEvent');
                     helper.sendBackEvent(component,accounts[i]);
                 }

            }

            component.set('v.accounts',accounts);
     }

})