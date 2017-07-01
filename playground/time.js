  //standard  is Jan 1 1970  00:00:00 am   in utc 
const moment = require('moment');
/*
var date = new Date();
var current=console.log(date.getTime()); //2017-07-01T08:47:57.267Z
console.log(date.getMonth());  //7
//var month=['jan','feb',[...]];
 */
console.log(moment().valueOf());  //console.log(date.getTime());
var time = moment();
console.log(time.format());  //2017-07-01T14:17:57+05:30
console.log(time.format('MMM'));  // jul

console.log(time.format('HH:mm a'));//14:40 pm
console.log(time.format('h:mm a'));//2:41 pm

time.add(100,'year').subtract(7,'month');
console.log(time.format('MMM Do YYYY')); //Dec 1st 2116 //Jul 1st 2017 (without add and subtract) 