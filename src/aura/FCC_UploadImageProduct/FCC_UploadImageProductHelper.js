/**
 * Created by Marcin Łukasiak on 2017-12-10.
 */
({


    save : function(component) {
        var fileInput = component.find("file").getElement();
    	var file = fileInput.files[0];

        if (file.size > 750000) {
            alert('File size cannot exceed ' + 750000 + ' bytes.\n' +
    		  'Selected file size: ' + file.size);
    	    return;
        }

        var fr = new FileReader();

	var self = this;
       	fr.onload = function() {
            var fileContents = fr.result;
    	    var base64Mark = 'base64,';
            var dataStart = fileContents.indexOf(base64Mark) + base64Mark.length;

            fileContents = fileContents.substring(dataStart);

    	    self.upload(component, file, fileContents);
        };

        fr.readAsDataURL(file);
    },

    upload: function(component, file, fileContents) {
        var action = component.get("c.saveTheFile");

        action.setParams({
            parentId: component.get("v.parentId"),
            fileName: file.name,
            base64Data: encodeURIComponent(fileContents),
            contentType: file.type
        });

        action.setCallback(this, function(a) {
            var attachId = a.getReturnValue();
            console.log("attachID");
            console.log(attachId);
        });

            $A.enqueueAction(action);

    }
})