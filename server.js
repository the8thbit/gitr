require('shelljs/global');

if (!which('git')) {
	echo('Sorry, this script requires git.');
	exit(1);
}

var exec_string = "git";
process.argv.forEach(function (val, index, array) {
	if(index >= 2) {
		exec_string += " " + val;
	}
});

console.log(exec_string);

// Run external tool synchronously
if (exec(exec_string).code !== 0) {
	echo('Error: git failed.');
	exit(1);
}
