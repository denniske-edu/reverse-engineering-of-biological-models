var express = require('express');
var app = express();

var sys = require('sys');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

app.get('/', function (req, res) {

	var content = '';

	var child = spawn('gfan');

	child.on('exit', function(code) {
		res.jsonp(content);
	});

	child.stdin.setEncoding('utf-8');
	
	child.stdout.on('data', function (data) {
		content += data;
	});

	child.stdin.write(req.query.vars);
	child.stdin.write('\n');
	child.stdin.write(req.query.polys);
	child.stdin.write('\n');

	//exec("gfan", function (error, stdout, stderr) {
	//	sys.print('stdout: ' + stdout);
	//	sys.print('stderr: ' + stderr);
	//	if (error !== null) {
	//		console.log('exec error: ' + error);
	//	}
	//});
});

app.listen(8080, function () {
	console.log('Example app listening on port 8080!');
})