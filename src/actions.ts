import fs from "fs";
import path from "path";
import { cwd } from "./cwd";
import inquirer from "inquirer";
import { FileMover } from "./file-mover";

export const init = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "targetDir",
        message: "Where should the images be stored?",
        default: cwd,
      },
    ])
    .then((answers: { targetDir: string }) => {
      console.log("Setting target directory to", answers.targetDir);

      // overwrite the config file
      const configFile = path.resolve(cwd, "config.json");
      const config = {
        targetDir: answers.targetDir,
      };

      if (!fs.existsSync(configFile)) {
        console.log("Creating config file");
      } else {
        console.log("Updating config file");
      }

      try {
        fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
        console.log("Config file updated");
      } catch (error) {
        console.error(error);
      }
    });
};

export const move = (options: {
  file?: string;
  name?: string;
  upsert?: boolean;
}) => {
  if (!options.file) {
    throw new Error(
      "Please provide a file to upload. Use --help for more info."
    );
  }

  const fileMover = new FileMover(options.file);

  // if the user wants to rename the file
  // this is where we set the name
  if (!options.name) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Rename the image?",
          default: path.basename(options.file),
        },
      ])
      .then((answers: { name: string }) => {
        console.log("Name will be set to: ", answers.name);
        fileMover.setFileName(answers.name);
      });
  } else {
    fileMover.setFileName(options.name);
  }

  // does the file already exist in the target directory?
  // if (fileMover.validateTargetPath()) {
  //   console.log("File already exists");

  //   // does the user want to overwrite the file?
  //   if (!options.upsert) {
  //     return;
  //   } else {
  //     console.log("Overwriting file");
  //   }

  //   return;
  // }

  if (fileMover.validateFilePath()) {
    fileMover.moveToTargetDir();
  } else {
    throw new Error("File does not exist");
  }
};
