'use strict';

var aws = require('aws-sdk');
var https = require('https');
var dynamo = new aws.DynamoDB({
	region: "ap-southeast-2",
	httpOptions: {
	    agent: new https.Agent({
	      rejectUnauthorized: true,
	      keepAlive: true
	    })
	 }
});
var prettyHrtime = require('pretty-hrtime');

function getRecord(){

    var table = "test"
    var key="FOO"
    
    var start = process.hrtime();

    dynamo.getItem({
	TableName: table,
	ConsistentRead: false,
	Key: {
	    key: { "S": key } 
	}
    }, function(err, record){
        if(err){
            console.error(err)
        }
        else {
            var diff = process.hrtime(start);
            console.log(prettyHrtime(diff));
        }
    });
}

setInterval(getRecord, 1000)
