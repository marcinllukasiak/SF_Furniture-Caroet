/**
 * Created by Marcin Łukasiak on 2017-12-11.
 */
({
    doInit : function(component, event) {
            var products = component.get("v.products");
            products = new Array();
             component.set("v.products",products);

    },
    addProductToBasket: function(component, event, helper) {

          var product = event.getParam('product');

          console.log(product);

          var products = component.get("v.products");
          console.log(products);
          products.push(product);
          component.set("v.products",products);

      },
})