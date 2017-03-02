/* CanMap Web Server
 * Node
 * React
 *
 * For SYDE 322
 * University of Waterloo
 * Department of Systems Design Engineering
 * 
 * Danny Gossain
 * Raunaq Suri
 * Cory Welch
 */

/*------------------*
**-  Initial Setup  -
**------------------*/

const HTTP = require('http');
const HTTPS = require('https');

const URL = require('url');
const PATH = require('path');

const FS = require('fs'); 

const express = require('express');

var PORT = 8080; //Default Port
if(process.argv[2]){
    PORT = process.argv[2]; //If Specificied
}

var app = express();
var server = HTTP.createServer(app);

/*---------------------*
**-  Global Functions  -
**---------------------*/
//Function to start all processes, load all data, establish inital connections etc. Last step is to listen on the designated port
function serverStartup() {
	
	//PUT ANY STARTUP PROCEDURES HERE!
	
    setTimeout(function () {
        console.log('All Startup Procedues Done');
        server.listen(PORT);
        console.log("Listening on port "+PORT);
    }, 1000); //Increase time as necessary
}

/*------------*
**-  Main UI  -
**------------*/
//Define router for main UI, allows us to add an API, or admin, or processing status routes later
var root = express.Router();

root.get('/', function (req, res) {
    res.send('CanMap Homepage');   
});


/*-------------------*
**-  Startup Server  -
**-------------------*/

app.use('/',root);

serverStartup();


