
var fs = require('fs');
var async = require('async');
var project = process.argv[2];

var pathBase = '/Users/flocks';
var ncp = require('ncp').ncp;

ncp.limit = 16;



fs.mkdir(pathBase+'/'+project,function(e){
    if(!e || (e && e.code === 'EEXIST')){
        //do something with contents
        ncp('project', pathBase+'/'+project, function (err) {
 			if (err) {
   				return console.error(err);
 			}
			 console.log('done!');
		});

    } else {
        //debug
        console.log(e);
    }
});
