// Example of using a library from npm
import _ from 'lodash';

function main() {
  const chunks = _.chunk(['a', 'b', 'c', 'd'], 2);
  console.log("Starting...", chunks);
}

// Call main here to not lose it after bundling
main();

