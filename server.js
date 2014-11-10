require('shelljs/global');
var jsesc = require('jsesc');

if (!which('git')) {
	echo('Sorry, this script requires git.');
	exit(1);
}

//get parameters
var node_params = [];
process.argv.forEach(function (val, index, array) {
	if (index >= 2) {
		if (val.indexOf(' ') >= 0) {
			node_params.push("\"" + val + "\"");
		} else {
			node_params.push(val);
		}
	}
});

var git_params = gen_git_params(node_params);
run_com("git", git_params);


function gen_git_params(params) {
	git_params = [];
	if (false) {
		//do something
	} else if (false) {
		//do something else
	} else {
		git_params = params;
	}
	return git_params;
}

function run_com(command, params) {
	var exec_string = command + " " +  params.join(" ");
	// Run external tool synchronously
	if (exec(exec_string).code !== 0) {
		echo('Error: execution failed.');
		exit(1);
	}
}
