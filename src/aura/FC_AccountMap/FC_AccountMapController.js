({
    doInit: function(component) {
       var obEvent = component.get("v.objectEvent");
       obEvent = $A.get("e.c:FC_PaintItem");
       component.set("v.objectEvent",obEvent);

    },
    jsLoaded: function(component, event, helper) {
        console.log('jsLoaded Start');
        var map = L.map('map', {zoomControl: false}).setView([51.759248, 19.455983], 5);
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: 'Tiles © Esri'
            }).addTo(map);
        component.set("v.map", map);
    },

    accountsLoaded: function(component, event, helper) {
        var markers = new L.FeatureGroup();
        var marker;

        console.log('Mapa zlapala Event' + event.getParam('accounts'));
        var map = component.get('v.map');

        if(component.get('v.markers') != null){
            map.removeLayer(component.get('v.markers'));
        }
         if(component.get('v.markersAll') != null){
            map.removeLayer(component.get('v.markersAll'));
        }

        var accounts = event.getParam('accounts');
        var eventArray = {};
        for (var i=0; i<accounts.length; i++) {
            var account = accounts[i];
            var latLng = [account.Location__Latitude__s, account.Location__Longitude__s];
            var key = ''+account.Location__Latitude__s+', '+account.Location__Longitude__s;
            eventArray[key] = $A.get("e.c:FC_PaintItem").setParams({"location": key});
            console.log('EVENT KEY ->' + key + "<-");
//            var eventObject  = $A.get("e.c:FC_PaintItem");


            marker = L.marker(latLng).on('click', (e) =>
                                                    {
                                                        var ll =  e.latlng.toString();
                                                        var subll =  ll.substring(7,ll.length-1);
                                                        var cmpEven = component.get("v.objectEvent");
                                                        console.log(component.get("v.objectEvent"));
                                                        component.set("v.isEvent",false);
                                                        component.set("v.objectEvent",null);
                                                        console.log("CmpEvent ");
                                                        console.log(component.get("v.objectEvent"));

                                                        cmpEven.setParams({"location" : subll });
                                                        cmpEven.fire();

                                                    }).addTo(map);

// OnClick marker function

            markers.addLayer(marker);
//            L.marker(latLng, {account: account}).addTo(map);
        }
        component.set("v.markers",markers);
        component.set("v.markersAll",markers);
        map.addLayer(markers);
    },

    objectEventChange: function(component, event, helper) {
        console.log("Stworzenie nowego Eventu");

        var isEvent = component.get("v.isEvent");
        if(!isEvent){
           var obEvent = component.get("v.objectEvent");
                   obEvent = $A.get("e.c:FC_PaintItem");
                   component.set("v.isEvent",true);
                   component.set("v.objectEvent",obEvent);

        }

    },
    accountSelected: function(component, event, helper) {

        var map = component.get('v.map');
        var markers = component.get('v.markers');
        var markersAll = component.get('v.markersAll');
        var marker;
        map.removeLayer(markers);
        map.removeLayer(markersAll);

        markers = new L.FeatureGroup();
        var account = event.getParam('account');
        console.log("ACCOUNT MAP SELECT");
        console.log(account);
        var latLng = [account.Location__Latitude__s, account.Location__Longitude__s];
        marker = L.marker(latLng);
        markers.addLayer(marker);
        component.set("v.markers",markers);
        map.addLayer(markers);
//
        map.panTo([account.Location__Latitude__s, account.Location__Longitude__s]);
    },
    showAll: function(component, event, helper) {

        var map = component.get('v.map');
        var markersAll = component.get('v.markersAll');
         if(component.get('v.markers') != null){
            var markers = component.get('v.markers');
//            markersAll = component.get('v.markersAll');
            map.removeLayer(markers);
//            map.removeLayer(markersAll);
            }

        map.addLayer(markersAll);

    },
    locationStringChange: function(){
        console.log("Urucomienie funkcji zmiana wartosci");
    }
})