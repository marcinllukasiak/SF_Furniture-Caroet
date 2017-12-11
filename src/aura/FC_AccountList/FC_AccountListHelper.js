/**
 * Created by Marcin Łukasiak on 2017-12-07.
 */
({
     sendBackEvent : function(component, account) {
            var event = $A.get("e.c:FC_AccountSelected");
            console.log('EventBack set param');
            console.log(account);
            event.setParams({"account": account});
            event.fire();
        },
})