require('shelljs/global');
var jsesc = require('jsesc');

if (!which('git')) {
	echo('Sorry, this script requires git.');
	exit(1);
}

//generate call to git
var exec_string = "git";
process.argv.forEach(function (val, index, array) {
	if (val.indexOf(' ') >= 0) {
		val = "\"" + val + "\"";
	}

	if (index >= 2) {
		exec_string += " " + jsesc(val);
	}
});

// Run external tool synchronously
if (exec(exec_string).code !== 0) {
	echo('Error: git failed.');
	exit(1);
}
