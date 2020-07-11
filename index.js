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
  const githubBearerToken = core.getInput('github-bearer-token');

  console.log('Options:');
  console.log(`  path: ${path}`);
  console.log(`  out: ${out}`);
  console.log(`  json: ${json}`);

  let command = `dotnet CycloneDX ${path} --out ${out}`
  if (json) command += ' --json';

  console.log(`Running: ${command}`);

  if (githubBearerToken != '') {
    console.log('With GitHub bearer token');
    command += ' --github-bearer-token ' + githubBearerToken;
  }

  output = execSync(command, { encoding: 'utf-8' });
  console.log(output);

  console.log('BOM Contents:');
  if (json) {
    let bomContents = fs.readFileSync(`${out}/bom.json`).toString('utf8');
    console.log(bomContents);
  } else {
    let bomContents = fs.readFileSync(`${out}/bom.xml`).toString('utf8');
    console.log(bomContents);
  }
} catch (error) {
  core.setFailed(error.message);
}