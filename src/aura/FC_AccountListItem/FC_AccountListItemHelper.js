/**
 * Created by Marcin Łukasiak on 2017-12-07.
 */
({
    changeColour : function(component) {
        var items = document.getElementsByClassName("itemListToPaint");
        items.forEach(function(item, index) {
          item.style.background = "#f3f3f3";
        });
    }
})