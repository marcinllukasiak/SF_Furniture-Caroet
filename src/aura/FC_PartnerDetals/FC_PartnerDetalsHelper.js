/**
 * Created by Marcin Łukasiak on 2017-12-06.
 */
({

    saveAccountHelper : function(cmp, event, helper) {
            var recordLoader = cmp.find("recordLoader");
            console.log(cmp.get('v.record'));
            recordLoader.saveRecord($A.getCallback(function(saveResult) {
                if (saveResult.state === "ERROR") {
                    var errMsg = "";
                    // saveResult.error is an array of errors,
                    // so collect all errors into one message
                    for (var i = 0; i < saveResult.error.length; i++) {
                        errMsg += saveResult.error[i].message + "\n";
                    }
                    cmp.set("v.recordSaveError", errMsg);
                } else if(saveResult.state == 'SUCCESS'){
                    cmp.set("v.recordSaveError", "");

                    var act = $A.get("e.c:FC_AccountEdit");

                    console.log('event');
                    console.log(act);
                     var acc = cmp.get("v.record");
                     console.log("acc");
                     console.log(acc);
                     act.setParams({account: acc});
                     try {
                     act.fire();
                     } catch ( err ) {
                         console.error(err);
                     }
                    console.log("Event change fire");

                }
            }));
        },


        propagatingChanges : function (component){

             var event = $A.get("e.c:FC_AccountEdit");
             var acc = component.get("v.account");
             console.log("Event change set param " + acc);
             event.setParams({"account": acc});
             event.fire();
            console.log("Event change fire");
        }



})