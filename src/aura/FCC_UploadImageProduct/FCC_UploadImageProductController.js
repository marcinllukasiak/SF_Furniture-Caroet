/**
 * Created by Marcin Łukasiak on 2017-12-10.
 */
({
    save : function(component, event, helper) {
        helper.save(component);
    },

    waiting: function(component, event, helper) {
    	$A.util.addClass(component.find("uploading").getElement(), "uploading");
    	$A.util.removeClass(component.find("uploading").getElement(), "notUploading");
    },

    doneWaiting: function(component, event, helper) {
    	$A.util.removeClass(component.find("uploading").getElement(), "uploading");
    	$A.util.addClass(component.find("uploading").getElement(), "notUploading");
    }
})