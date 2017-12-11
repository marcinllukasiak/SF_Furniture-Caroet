/**
 * Created by Marcin Łukasiak on 2017-12-05.
 */
({
     accountLoad: function(component, event, helper) {


            console.log("Odebrany Account");
            var account = event.getParam("account");
            console.log(account);


             component.set('v.recordId', account.Id);
             component.find('recordLoader').reloadRecord(true);
//             var rec = component.get('v.record');
//             rec.fields.Name.value = account.Name;
//             component.set('v.record', account);
             component.set("v.isDetales",true);
             component.set("v.truthy",false);

     },
      paintItemHadler: function(component, event, helper) {


            console.log("Odebrany PAINT EVENT TEST");



             component.find('recordLoader').reloadRecord(true);

             component.set("v.isDetales",true);
             component.set("v.truthy",true);

     },
     goToObject : function (component, event, helper) {
                  var navEvt = $A.get("e.force:navigateToSObject");
                  navEvt.setParams({
                    "recordId": component.get("v.recordId"),
                    "slideDevName": "detail"
                  });
                  navEvt.fire();
     },
     goToEdit : function(component, event){
//        var showEdit = component.get("v.truthy");
        component.set("v.truthy",true);
        component.set("v.isDetales",false);

     },
     saveAccount : function(component, event, helper) {
        component.set("v.truthy",true);
        component.set("v.isDetales",true);
        helper.saveAccountHelper(component,event,helper);

     },
     isShowComponent : function(component, event, helper) {
         var isShowComponent = event.getParam("isShow");
        component.set("v.truthy",isShowComponent);


     },

    // Control the component behavior here when record is changed (via any component)
    handleRecordUpdated: function(component, event, helper) {
        var eventParams = event.getParams();
        if(eventParams.changeType === "CHANGED") {
            // get the fields that are changed for this record
            var changedFields = eventParams.changedFields;
            console.log('Fields that are changed: ' + JSON.stringify(changedFields));
            // record is changed so refresh the component (or other component logic)
            var resultsToast = $A.get("e.force:showToast");
            resultsToast.setParams({
                "title": "Saved",
                "message": "The record was updated."
            });
            resultsToast.fire();
        } else if(eventParams.changeType === "LOADED") {
            // record is loaded in the cache
        } else if(eventParams.changeType === "REMOVED") {
            // record is deleted and removed from the cache
        } else if(eventParams.changeType === "ERROR") {
            console.log('Error: ' + component.get("v.error"));
        }
    },
    showCreatePartner: function(component, event, helper) {
        var showCreatePartner = event.getParam("isShow");

        component.set("v.isCreate",showCreatePartner);
    },
     close: function(component, event, helper) {
        var showCreatePartner = event.getParam("isShow");

        component.set("v.isCreate",showCreatePartner);
    },



})