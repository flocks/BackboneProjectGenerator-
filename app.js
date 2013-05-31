
var fs = require('fs');
var async = require('async');
var project = process.argv[2];

var pathBase = '/Users/flocks';

fs.mkdir(pathBase+'/'+project,function(e){
    if(!e || (e && e.code === 'EEXIST')){
        //do something with contents
       fs.mkdir(pathBase+'/'+project+'/app', function(e) {
       		 if(!e || (e && e.code === 'EEXIST')) {
       		 	
       		 }
       		 else {
       		 	console.log(e);
       		 }
       });

    } else {
        //debug
        console.log(e);
    }
});
