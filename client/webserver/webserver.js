/*
 * CanMap Web Server
 * Node
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

const FS = require('fs'); // File System
const PATH = require('path'); // Path
const URL = require('url'); // Url

const HTTP = require('http'); // HTTP for requests
const HTTPS = require('https'); // HTTPS for future secure requests

const express = require('express'); // Express for Web Application

var PORT = 8080; //Default Port
if(process.argv[2]){
    PORT = process.argv[2]; //If Specificied
}

var app = express();
var server = HTTP.createServer(app);

/*--------------------*
**-  Resource Paths  -
**--------------------*/

app.use('/', express.static(PATH.join(__dirname,'/public'))); //Will serve any file in public folder if directly asked for (index.html included)
app.use('/js', express.static(PATH.join(__dirname, '/node_modules/jquery/dist'))); // redirect for jquery
app.use('/js', express.static(PATH.join(__dirname, '/node_modules/bootstrap/dist/js'))); // redirect for Bootstrap JS
app.use('/css', express.static(PATH.join(__dirname, '/node_modules/bootstrap/dist/css'))); // redirect for Bootstrap CSS
app.use('/js', express.static(PATH.join(__dirname, '/node_modules/angular'))); // redirect for Angular JS
app.use('/css', express.static(PATH.join(__dirname, '/node_modules/angular'))); // redirect for Angular JS

app.use('/maps',express.static(PATH.join(__dirname, '/maps')));

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
    res.sendFile(PATH.join(__dirname,'public','index.html'));
});

root.get('/config/:file', function(req, res){
    FS.readFile(PATH.join(__dirname,'config',req.params.file),'utf-8',function(err, data){
        if(err){
            res.send(err);
        }
        //console.log(data);
        res.json(JSON.parse(data));
    });
});

root.get('/config/:file', function(req, res){
    FS.readFile(PATH.join(__dirname,'config',req.params.file),'utf-8',function(err, data){
        if(err){
            res.send(err);
        }
        console.log(data);
        res.json(JSON.parse(data));
    });
});

/*-------------------*
**-  Startup Server  -
**-------------------*/

app.use('/',root);

serverStartup();
