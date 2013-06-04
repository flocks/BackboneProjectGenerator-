
var fs = require('fs');
var async = require('async');
var project = process.argv[2];

var pathBase = '/Users/flocks';
var ncp = require('ncp').ncp;
var GitHubApi = require("node-github");

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    timeout: 5000
});

github.authenticate({
    type: "oauth",
    token: "53916f4092bc617bcb6a691adbef54a6276dc27f"
});



ncp.limit = 16;



fs.mkdir(pathBase+'/'+project,function(e){
    if(!e || (e && e.code === 'EEXIST')){
        //do something with contents
        ncp('project', pathBase+'/'+project, function (err) {
 			if (err) {
   				return console.error(err);
 			}
			 console.log('done!');
	     github.repos.create({name : project, private : true}, function(err) {
		if(err) { console.log(err);}
	     })
		});

    } else {
        //debug
        console.log(e);
    }
});
