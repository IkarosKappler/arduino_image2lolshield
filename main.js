/**
 * @author Ikaros Kappler
 * @date 2014-08-21
 * @version 1.0.0
 **/



function init() {

    // NOOP?

}

window.addEventListener('load', init, false);


function loadInputImageFile() {

    MyImageReader.readImageFile();

}

/*
function processBinaryImageData( arrayBuffer ) {

    window.alert( "arrayBuffer=" + arrayBuffer );

}*/

function processImageDataURI( dataURI ) {

    //window.alert( dataURI );
    
    var imgElement = document.getElementById( "preview_image" );
    imgElement.src = dataURI;


    var image      = new Image();
    image.src      = dataURI;

    var rasterRows = getSelectedRasterRows();
    var rasterCols = getSelectedRasterCols();


    // Create an invisible in-memory canvas
    var tmpCanvas     = document.createElement( "canvas" );
    var canvasWidth   = tmpCanvas.width;
    var canvasHeight  = tmpCanvas.height;
    var tmpContext    = tmpCanvas.getContext( "2d" );
    tmpContext.drawImage( image, 0, 0, canvasWidth, canvasHeight );
    // The actual data is in the object's 'data' array
    /*
    window.alert( "canvasWidth=" + canvasWidth + ",\n" +
		  "canvasHeight=" + canvasHeight + "\n" 
		);
    */
    
    
    
    // Resize element to full image dimension?
    // ...


    var buffer = "<table border=\"0\" style=\"border-spacing: 0px; border-collapse: separate;\">";

    // Get the raster data
    var hRasterSize  = canvasWidth / rasterCols;
    var vRasterSize  = canvasHeight / rasterRows;
    //window.alert( "hRasterSize=" + hRasterSize + ", vRasterSize=" + vRasterSize );
    //var dataMatrix   = [ hRasterSize ][ vRasterSize ];
    for( var yStep = 0; yStep*vRasterSize < canvasHeight; yStep++ ) {
	// window.alert( "yStep=" + yStep );
	
	buffer += "<tr>";
	
	var matrixY     = Math.round( yStep*vRasterSize );
	for( var xStep = 0; xStep*hRasterSize < canvasWidth; xStep++ ) {

	    var matrixX = Math.round( xStep*hRasterSize );
	    //window.alert( "x=" + matrixX );

	    //var arrayOffset = matrixY*hRasterSize + 
	    
	    var imageData     = tmpContext.getImageData( matrixX, matrixY, 1, 1 ); 
	    var red           = imageData.data[0];
	    var green         = imageData.data[1];
	    var blue          = imageData.data[2];
	    var alpha         = imageData.data[3];
	    
	    /*
	    window.alert(  "red=" + red + ",\n" +
			   "green=" + green + ",\n" +
			   "blue=" + blue + ",\n" +
			   "alpha=" + alpha + ",\n" 
			);
*/
	    buffer += "<td style=\"spacing: 0px; padding: 1px;\"><div style=\"width: 20px; height: 20px; color: rgb("+red+","+green+","+blue+"); margin: 0px;\">&#x2b24;</div></td>\n";

	}
	buffer += "</tr>\n";
    }

    buffer += "</table>\n";


    document.getElementById( "output_div" ).innerHTML = buffer;
    
}