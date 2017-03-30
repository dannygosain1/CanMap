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

Date.prototype.addDays = function(days) { //http://stackoverflow.com/questions/563406/add-days-to-javascript-date
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}
