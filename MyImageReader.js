/**
 * Reads files. 
 *
 * @author Ikaros Kappler
 * @date 2014-08-25
 * @version 1.0.0
 **/


MyImageReader = {

    readImageFile : function() {
	var audioFile = document.getElementById( "input_image_file" );
	MyImageReader._readImageFile( audioFile );
    },

    _readImageFile : function( file ) {
		
	if( file.files && file.files[0] ) {

	    var width;
	    var height;
	    var fileSize;
	    var reader = new FileReader();
	    reader.onload = function(event) {
		var dataURI = event.target.result;
		processImageDataURI( dataURI );
		
		// var arrayBuffer = event.target.result;		
		// processBinaryImageData( arrayBuffer );

	    };
	    reader.onerror = function(event) {
		console.error("File could not be read! Code " + event.target.error.code);
		window.alert( "File could not be read! Code " + event.target.error.code );
	    };
	    reader.readAsDataURL(file.files[0]);
	    //reader.readAsArrayBuffer( file.files[0] ); // Read as binary data!
	} else {
	    window.alert( "Error: no files found to be read." );
	}
    }
};
