require('shelljs/global');

if (!which('git')) {
	echo('Sorry, this script requires git.');
	exit(1);
}

// Run external tool synchronously
if (exec('git status').code !== 0) {
  echo('Error: git failed.');
  exit(1);
}

