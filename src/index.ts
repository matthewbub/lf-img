#!/usr/bin/env node
import { FileMover } from "./file-mover";
import { Command } from "commander";
const [file] = process.argv.slice(2);

import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import { cwd } from "./cwd";

// validate the file exists
// uploader.validate();

const fileMover = new FileMover(file);

try {
  (async () => {
    fileMover.validate();
    fileMover.moveToTargetDir();
  })();
} catch (error) {
  console.error(error);
  process.exit(1);
}

// const program = new Command();
// program
//   .name("lf-img-util")
//   .description("CLI tool for managing images in a local directory")
//   .version("0.0.1");

// program
//   .command("init")
//   .description("initialize the project")
//   .action(() => {
//     inquirer
//       .prompt([
//         {
//           type: "input",
//           name: "targetDir",
//           message: "Where should the images be stored?",
//           default: cwd,
//         },
//       ])
//       .then((answers) => {
//         console.log("Setting target directory to", answers.targetDir);
//         console.log(answers);

//         // overwrite the config file
//         const configFile = path.resolve(cwd, "config.json");
//         const config = {
//           targetDir: answers.targetDir,
//         };

//         try {
//           if (!fs.existsSync(configFile)) {
//             console.log("Creating config file");
//           } else {
//             console.log("Updating config file");
//           }
//           fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
//           console.log("Config file updated");
//         } catch (error) {
//           console.error(error);
//           process.exit(1);
//         }
//       });
//   });

// program
//   .command("upload")
//   .description("upload an image")
//   .option("-f, --file <file>", "the file to upload")
//   .option("-n, --name <name>", "the name of the image")
//   .option("-u, --upsert", "update an existing image")
//   .action((options) => {
//     console.log("upload");
//     console.log(options);
//   });
// program.parse();
