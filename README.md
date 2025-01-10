> [!NOTE]
> This GitHub Action is considered deprecated.  
> Instead, you may use one of the following tools in your github workflow:
>
> - for NPM projects: [`@yclonedx/cyclonedx-npm`](https://www.npmjs.com/package/%40cyclonedx/cyclonedx-npm)
>   ```yaml
>   - name: Create SBOM step
>     # see for usage: https://www.npmjs.com/package/%40cyclonedx/cyclonedx-npm
>     run: npx @cyclonedx/cyclonedx-npm --help
>   ```
> - for YARN projects: [`@cyclonedx/yarn-plugin-cyclonedx`](https://www.npmjs.com/package/%40cyclonedx/yarn-plugin-cyclonedx)
>   ```yaml
>   - name: Create SBOM step
>     # see for usage: https://www.npmjs.com/package/%40cyclonedx/yarn-plugin-cyclonedx
>     run: yarn dlx -q @cyclonedx/yarn-plugin-cyclonedx --help
>   ```
>  - for PNPM projects: *to be announced*

For other Node.js related CycloneDX SBOM generators, see also: <https://github.com/CycloneDX/cyclonedx-node-module/blob/master/README.md>

----

[![Website](https://img.shields.io/badge/https://-cyclonedx.org-blue.svg)](https://cyclonedx.org/)
[![Slack Invite](https://img.shields.io/badge/Slack-Join-blue?logo=slack&labelColor=393939)](https://cyclonedx.org/slack/invite)
[![Group Discussion](https://img.shields.io/badge/discussion-groups.io-blue.svg)](https://groups.io/g/CycloneDX)
[![Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&label=Follow)](https://twitter.com/CycloneDX_Spec)

# GitHub action to generate a CycloneDX SBOM for Node.js

This GitHub action will create a a valid CycloneDX Software Bill-of-Materials (SBOM) containing an aggregate of all project dependencies. CycloneDX is a lightweight SBOM specification that is easily created, human and machine readable, and simple to parse.

This GitHub action requires a node_modules directory so this action will typically need to run after an npm build.

## Inputs

### `path`

The path to a Node.js project, default is "./"

Be sure to quote paths with spaces.

### `output`

Output filename, default is "./bom.xml"

Be sure to quote paths with spaces.

## Example simple usage

```yaml
uses: CycloneDX/gh-node-module-generatebom@v1
```

## Example step that defines the output and path (both are optional)

```yaml
- name: Create SBOM step
  uses: CycloneDX/gh-node-module-generatebom@v1
  with:
    path: './node_project/'
    output: './bom_directory/test.app.bom.xml'
```

## Complete Action with npm build and SBOM creation

```yaml
name: Build javascript project
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    name: Install and build javascript
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
      - run: npm install
      - name: Create SBOM with CycloneDX
        uses: CycloneDX/gh-node-module-generatebom@v1
        with: 
          output: './test.app.bom.xml'
```

## Internals

This action uses `@cyclonedx/bom@<4`. See [`@cyclonedx/bom` in NPMjs](https://www.npmjs.com/package/@cyclonedx/bom).
