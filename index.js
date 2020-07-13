const fs = require('fs');
const core = require('@actions/core');
const execSync = require('child_process').execSync;

try {
  // check it CycloneDX is installed
  try {
    execSync('cyclonedx-bom --help');
  } catch (error) {
    console.log('Installing CycloneDX...');
    let output = execSync('npm install -g @cyclonedx/bom', { encoding: 'utf-8' });
    console.log(output);
  }

  const path = core.getInput('path');
  const out = core.getInput('output');

  console.log('Options:');
  console.log(`  path: ${path}`);
  console.log(`  output: ${out}`);

  let command = `cyclonedx-bom --output=${out} ${path}`

  console.log(`Running: ${command}`);

  output = execSync(command, { encoding: 'utf-8' });
  console.log(output);

  console.log('BOM Contents:');
  let bomContents = fs.readFileSync(`${out}`).toString('utf8');
  console.log(bomContents);
} catch (error) {
  core.setFailed(error.message);
}