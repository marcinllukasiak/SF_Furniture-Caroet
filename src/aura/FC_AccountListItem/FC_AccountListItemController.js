({
    accountSelected : function(component,helper) {
        var event = $A.get("e.c:FC_AccountSelected");
        event.setParams({"account": component.get("v.account")});
        event.fire();

        //clean colour items
         var items = document.getElementsByClassName("itemListToPaint");

         for (var i = 0; i < items.length; i++) {
           items[i].style.background = "white"; //white rebeccapurple
           items[i].style.color = "black"; //white black
         }

         //change colour select item
         var acc = component.get("v.account")
         var item = document.getElementById(acc.Location__Latitude__s+', '+acc.Location__Longitude__s);
         item.style.background = "rebeccapurple"; //white rebeccapurple
         item.style.color = "white"; //white black
    },

})