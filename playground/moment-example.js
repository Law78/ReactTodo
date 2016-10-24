var moment = require('moment');

console.log(moment().format());

console.log(moment().format('DD-MM-YYYY'));

var now = moment();

// Numeri di secondi dal 1970:
console.log('Current timestamp: ', now.unix());

// Vedi : http://momentjs.com/docs/#/displaying/

// Converto il timestamp in una data
var timestamp = 1477298658;
var currentMoment = moment.unix(timestamp);
console.log('Current Moment: ', currentMoment.format('DD-MM-YYYY'));
console.log('Current Moment: ', currentMoment.format('DD-MM-YYYY @ h:mm'));
console.log('Current Moment: ', currentMoment.format('MMMM D, YY @ h:mm a'));

// Month 3rd, YYYY @ 12:13 AM

console.log('Current Moment: ', currentMoment.format('MMMM Do, YYYY @ hh:mm A'));
