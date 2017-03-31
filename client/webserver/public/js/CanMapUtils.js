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

String.prototype.replaceAll = function(old, replacement) {
	return this.split(old).join(replacement);
}

//Additional Date Prototype to easy add days to a date.
Date.prototype.addDays = function(days) { //http://stackoverflow.com/questions/563406/add-days-to-javascript-date
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}

