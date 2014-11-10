require('shelljs/global');
var jsesc = require('jsesc');

if (!which('git')) {
	echo('Sorry, this script requires git.');
	exit(1);
}

//get parameters
var params = [];
process.argv.forEach(function (val, index, array) {
	if (index >= 2) {
		if (val.indexOf(' ') >= 0) {
			params.push("\"" + val + "\"");
		} else {
			params.push(val);
		}
	}
});

run_git(params);

function run_git(params) {
	var exec_string = "git " + params.join(" ");
	// Run external tool synchronously
	if (exec(exec_string).code !== 0) {
		echo('Error: git failed.');
		exit(1);
	}
}
