import chalk from "chalk";
import { analyzeMetafile, build } from "esbuild";

(async () => {
  try {
    const startTime = Date.now();
    console.info(
      chalk.bold(`🚀 ${chalk.blueBright("gh-node-module-generation")} Build\n`)
    );

    const result = await build({
      entryPoints: ["./src/index.js"],
      outfile: "dist/index.js",
      metafile: true,
      bundle: true,
      platform: "node",
      target: ["node16"], // This should be consistent with action.yml 'using'.
      sourcemap: "external",
      treeShaking: true,
    });

    const analysis = await analyzeMetafile(result.metafile);
    console.info(`📝 Bundle Analysis:${analysis}`);

    console.info(
      `${chalk.bold.green("✔ Bundled successfully!")} (${
        Date.now() - startTime
      }ms)`
    );
  } catch (error) {
    console.error(`🧨 ${chalk.red.bold("Failed:")} ${error.message}`);
    console.debug(`📚 ${chalk.blueBright.bold("Stack:")} ${error.stack}`);
    process.exit(1);
  }
})();
