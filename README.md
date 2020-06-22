# CycloneDX .NET Generate BOM action

Github action to generate a CycloneDX BOM for .NET projects

## Inputs

### `path`

**Required** The path to a .sln, .csproj, .vbproj, or packages.config file or the path to a directory which will be recursively analyzed for packages.config files

### `out`

Output directory

## Example usage

```
uses: CycloneDX/cyclonedx-dotnet-generatebom@master
with:
  path: 'Example.sln'
```