// Date Stamp Script

var makeDate = function() {

   // current date
   var cd = new Date();

   var formattedDate = "";

   // month
   formattedDate += (cd.getMonth() + 1) + "_";

   // day
   formattedDate += cd.getDate() + "_";

   // year
   formattedDate += cd.getFullYear();

   // return date
   return formattedDate;

};

//export
module.exports = makeDate;