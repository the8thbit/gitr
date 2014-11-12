#!/usr/bin/env node

var shell  = require('shelljs/global');
var colors = require('colors');
var store  = require('jfs');

conf_db =  new store('./.gitr/config.json');
task_db = new store('./.gitr/tasks.json');

if (!which('git')) {
	echo('Sorry, this program requires git.');
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
	var com_params = [];
	if (params[0] === "gen") {
		com_params = strip_param(params);
		gen(params);
	} else if (params[0] === "gen-world") {
		com_params = strip_param(params);
		gen_world(params);
	} else {
		com_params = params;
		run_com("git", com_params);
	}
}

function strip_param(params, i) {
	if (!i) { i = 0; }
	return params.splice(i, 1);
}

function run_com(command, params) {
	var exec_string = command + " " +  params.join(" ");
	// Run external tool synchronously
	if (exec(exec_string).code !== 0) {
		echo('Error: execution failed.');
		exit(1);
	}
}

function gen(params) {
	run_com("git init");
	run_com("git config color.ui always");
	gen_world(params);
	gen_character(params);
}

//generate the game world
function gen_world(params) {
	run_com("mkdir", ["'./.gitr'"]);
}

//generate a character in the game world
function gen_character(params) {
	//add character generation code here
}

