#!/usr/bin/env node

var shell  = require('shelljs/global');
var colors = require('colors');
var store  = require('jfs');
var fs     = require('fs');
var path   = require('path');

if (!which('git')) {
	echo('Sorry, this program requires git.');
	exit(1);
}


var repo_top_dir = get_top_dir();
if (repo_top_dir) {
	conf_db =  new store(repo_top_dir + '/.gitr/config.json');
	task_db = new store(repo_top_dir + '/.gitr/tasks.json');
} else {
	console.log("Error: No .gitr dir found. Did you create a world? Use 'gitr gen' to create a new world and repo or 'gitr gen-world' to add gitr to an existing git repo.");
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

function get_top_dir(current_dir) {
	if(!current_dir) { current_dir = process.cwd(); }
	var repo_top_dir = null;
	while (!repo_top_dir) {
		var current_dir_children = fs.readdirSync(current_dir);
		for (var i=0; i < current_dir_children.length; i+=1) {
			if(current_dir_children[i] === ".gitr") { repo_top_dir = current_dir; }
		}
		if (path.resolve(current_dir, '..') === current_dir) { break; }
		current_dir = path.dirname(current_dir);
	}
	
	return repo_top_dir;
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
	result = exec(exec_string); //run the command and store the result
	if (result.code !== 0) {
		echo('Error: command execution failed.');
		exit(1);
	}
	return result.output;
}

function gen(params) {
	run_com("git init");
	repo_top_dir = process.cwd();
	run_com("git config color.ui always");
	gen_world(params);
	gen_character(params);
}

//generate the game world
function gen_world(params) {
	if(!repo_top_dir) { repo_top_dir = process.cwd(); }
	run_com("mkdir", [repo_top_dir + "/.gitr"]);
}

//generate a character in the game world
function gen_character(params) {
	//add character generation code here
}
