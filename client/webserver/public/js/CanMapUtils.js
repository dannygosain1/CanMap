/*
 * CanMap main.js
 *
 * For SYDE 322
 * University of Waterloo
 * Department of Systems Design Engineering
 * 
 * Danny Gossain
 * Raunaq Suri
 * Cory Welch
 * 
 * 
 * Contains all Global Functions and Calls
 * 
 * Should be included by all html files
 * 
 */
 
// isInvalid will return true if undefined or type is undefined
function isInvalid(item){
    if( item == undefined || item == "undefined" || typeof(item) == undefined || typeof(item) == "undefined" ){
        return true;
    } else {
        return false;
    }
}

//http://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
String.prototype.replaceAll = function(old, replacement) {
	return this.split(old).join(replacement);
}

//http://stackoverflow.com/questions/4878756/javascript-how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
String.prototype.capitalize = function(){
    return this.toLowerCase().replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } ); }

