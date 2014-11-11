var shell = require('shelljs/global');
var colors = require('colors');

if (!which('git')) {
	echo('Sorry, this script requires git.');
	exit(1);
}

var node_params = get_params();
process_params(node_params);

function get_params() {
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
	return node_params;
}

function process_params(params) {
	git_params = [];
	if (params[0] === "init-world") {
		run_com("mkdir", ["./.gitr"]);
	} else if (false) {
		//do something else
	} else {
		git_params = params;
		run_com("git", git_params);
	}
}

function run_com(command, params) {
	var exec_string = command + " " +  params.join(" ");
	// Run external tool synchronously
	if (exec(exec_string).code !== 0) {
		echo('Error: execution failed.');
		exit(1);
	}
}
