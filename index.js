const fs = require('fs');
const core = require('@actions/core');
const execSync = require('child_process').execSync;

try {
  // check it CycloneDX is installed
  try {
    execSync('dotnet CycloneDX --help');
  } catch (error) {
    console.log('Installing CycloneDX...');
    let output = execSync('dotnet tool install --global CycloneDX', { encoding: 'utf-8' });
    console.log(output);
  }

  const path = core.getInput('path');
  const out = core.getInput('out');
  const json = core.getInput('json') != 'false';

  console.log('Options:');
  console.log(`  path: ${path}`);
  console.log(`  out: ${out}`);
  console.log(`  json: ${json}`);

  let command = `dotnet CycloneDX ${path} --out ${out}`
  if (json) command += ' --json';

  console.log(`Running: ${command}`);
  output = execSync(command, { encoding: 'utf-8' });
  console.log(output);

  const bomContents = fs.readFileSync(`${out}/bom.xml`).toString('utf8');
  console.log('BOM Contents:');
  console.log(bomContents);
} catch (error) {
  core.setFailed(error.message);
}