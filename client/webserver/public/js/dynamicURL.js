/* 
 * CanMap Dynamic URL JS
 *
 * For SYDE 322
 * University of Waterloo
 * Department of Systems Design Engineering
 * 
 * Danny Gossain
 * Raunaq Suri
 * Cory Welch
 */
 
// New Global Variables for Dynamic URL Purposes
url_params = {}; //Important to note that whatever the keys are in here, will be the keys in the url.

//Document On Ready
$(document).ready(function(){
    //console.log('$(document).ready Called');
    loadPage();
});

// Allows us to handle when the back button is entered and rerender to previous URL
window.addEventListener('popstate', function(event) {
    //console.log('window.addEventListener(popstate) Called');
    loadPage();
});

// Function to be called any time the page is to be "refreshed"
function loadPage(){
    //console.log('loadPage Called');
    paramsFromURL();
    renderPage();    
}

// Function to update URL via params or optional path
function updateURL(path){

    if(isInvalid(path)){

        var pathname = $(location).attr('pathname');
        path = pathname + '?' + $.param(url_params);
    }
    
    history.pushState({},'UpdatedURL',path);
    renderPage();
}

// Function clears global params then uses the URL to generate a new one
function paramsFromURL(){
    //console.log('paramsFromURL Called');
    url_params = {};
    var params = $(location).attr('search').replace('?','').split('&');
    params.forEach(function(param){
        var keyval = param.split('=');
        var key = keyval[0].toLowerCase();
        var val = keyval[1];
        
        if(key == 'p'){
            
            if(isNaN(val) || val < 0){
                console.log('Invalid ProvID='+val);
                return; // = continue for forEach
            }
            
            url_params.p = val;
            
        } else if(key == 'a'){
            
            if(isNaN(val) || val < 0){
                console.log('Invalid AreaID='+val);
                return; // = continue for forEach
            }
            
            url_params.a = val;
            
        }
    });
    
    if(isInvalid(url_params.p)){
        url_params.p = 0;
        url_params.a = 0;
    }
    
    if(isInvalid(url_params.a)){
        url_params.a = 0;
    }
}

// Function to update params when prov is clicked
function provClicked(id){
    if(isNaN(id) || id < 0){
        console.log('Invalid Call of provClicked given id='+id);
        return;
    }
    
    url_params.p = id;
    url_params.a = 0;
    
    updateURL();
}

// Function to update params when area is clicked
function areaClicked(id){
    if(isNaN(id) || id < 0){
        console.log('Invalid Call of areaClicked given id='+id);
        return;
    }
    
    url_params.a = id;
    
    updateURL();
}

// Uses Global Params Variable to render page.
function renderPage(){
    
    if(url_params.p == 0){
        $('#areas').hide();
    } else {
        $('#areas').show();
    }
}
