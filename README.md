[![Website](https://img.shields.io/badge/https://-cyclonedx.org-blue.svg)](https://cyclonedx.org/)
[![Slack Invite](https://img.shields.io/badge/Slack-Join-blue?logo=slack&labelColor=393939)](https://cyclonedx.org/slack/invite)
[![Group Discussion](https://img.shields.io/badge/discussion-groups.io-blue.svg)](https://groups.io/g/CycloneDX)
[![Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&label=Follow)](https://twitter.com/CycloneDX_Spec)

# GitHub action to generate a CycloneDX SBOM for Node.js

## Inputs

### `path`

The path to a Node.js project, default is "./"

Be sure to quote paths with spaces.

### `output`

Output filename, default is "./bom.xml"

Be sure to quote paths with spaces.

## Example simple usage

```
uses: CycloneDX/gh-node-module-generatebom@master
```

## Example step that defines the output and path (both are optional)

```
- name: Create SBOM step
  uses: CycloneDX/gh-node-module-generatebom@master
  with:
    output: 'test.bom.xml'
    path: './bom_directory/'
```
