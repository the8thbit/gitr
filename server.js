require('shelljs/global');

if (!which('git')) {
	echo('Sorry, this script requires sl');
	exit(1);
}

// Run external tool synchronously
if (exec('sl').code !== 0) {
  echo('Error: sl failed.');
  exit(1);
}

