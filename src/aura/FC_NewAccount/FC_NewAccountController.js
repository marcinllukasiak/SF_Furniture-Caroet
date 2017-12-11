({
    doInit: function(component, event, helper) {
        // Prepare a new record from template
        console.log("Init new Account");
        component.find("accountRecordCreator").getNewRecord(
            "Account", // sObject type (entityAPIName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newAccount");
                var error = component.get("v.newAccountError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                }
                else {
                    console.log("Record template initialized: " + rec.sobjectType);
                }
            })
        );

    },
    jsLoaded: function(component, event, helper) {
        // Prepare a new record from template
        console.log("LINE 1");
//        var geocoder = new google.maps.Geocoder();
//        var address = "new york";
//                console.log("LINE 2");
//
//        geocoder.geocode( { 'address': address}, function(results, status) {
//                console.log("LINE 3");
//          if (status == google.maps.GeocoderStatus.OK) {
//                      console.log("LINE 4");
//            var latitude = results[0].geometry.location.lat();
//            var longitude = results[0].geometry.location.lng();
//            alert(latitude);
//          }
//        });
//      var bingGeocoder = new GeocoderJS.createGeocoder({provider: 'bing', apiKey: 'As11PsBXYvAoGEXmz59ZWl93T8_OACdXi2QnRKWMRIUK6hzOXgN3BcZHnbKyPZYo'});
//           bingGeocoder.geocode('1600 Pennsylvania Ave NW, Washington, DC', function(result) {
//            console.log(result);
//      });
    },

    saveAccount: function(component, event, helper) {

        if(helper.validateContactForm(component)) {

            component.find("accountRecordCreator").saveRecord(function(saveResult) {
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    // record is saved successfully
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Saved",
                        "message": "The record was saved."
                    });
                    resultsToast.fire();

                    //tworzenie eventu do mapy i detals
//                    console.log("New Account ->")
//                    console.log(component.get("v.simpleNewAccount"));
                    var event = $A.get("e.c:FC_AccountSelected");
                    event.setParams({"account": component.get("v.simpleNewAccount")});
                    event.fire();

                    // event dla listy
                     var event = $A.get("e.c:FC_AddPartner");
                     event.setParams({"account": component.get("v.simpleNewAccount")});
                     event.fire();

                     //// hidde new Partner
                   var appEvent = $A.get("e.c:FC_showCreatePartner");
                   appEvent.setParams({
                                   "isShow" : false });
                   appEvent.fire();

                } else if (saveResult.state === "INCOMPLETE") {
                    // handle the incomplete state
                    console.log("User is offline, device doesn't support drafts.");
                } else if (saveResult.state === "ERROR") {
                    // handle the error state
                    var resultsToast = $A.get("e.force:showToast");
                                resultsToast.setParams({
                                    "title": "Validation Error",
                                    "message": "Check all fields. Required Name."
                                });
                                resultsToast.fire();
                    console.log('Problem saving contact, error: ' +
                                 JSON.stringify(saveResult.error));
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state +
                                ', error: ' + JSON.stringify(saveResult.error));
                }
            });
        }else{

        }
    },
    close: function(component, event, helper) {
        // hidde new Partner
            var appEvent = $A.get("e.c:FC_showCreatePartner");
            appEvent.setParams({
                            "isShow" : false });
            appEvent.fire();

            //reinit
            component.find("accountRecordCreator").getNewRecord(
                    "Account", // sObject type (entityAPIName)
                    null,      // recordTypeId
                    false,     // skip cache?
                    $A.getCallback(function() {
                        var rec = component.get("v.newAccount");
                        var error = component.get("v.newAccountError");
                        if(error || (rec === null)) {
                            console.log("Error initializing record template: " + error);
                        }
                        else {
                            console.log("Record template initialized: " + rec.sobjectType);
                        }
                    })
                );
    }
})