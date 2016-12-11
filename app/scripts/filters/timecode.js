(function() {
     function timecode() {
         return function(seconds) {
             var seconds = Number.parseFloat(seconds);
             
             return buzz.toTimer(seconds);
             
         };
     }
 
     angular
         .module('blocJams')
         .filter('timecode', timecode);
 })();