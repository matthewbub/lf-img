import path from "path";
import fs, { PathLike } from "fs";
import { cwd } from "./cwd";

type Config = {
  targetDir: string;
};

export class FileMover {
  // file path relative to the current working directory
  filePath: string;

  // the target directory to move the file to
  targetDir: string = "./";

  // the name of the file if it was renamed
  fileName?: string;

  constructor(file: string) {
    this.setTargetDir();
    this.filePath = path.resolve(process.cwd(), file);
  }

  private setTargetDir() {
    // get the config file
    const configFile = path.resolve(cwd, "config.json");

    // check that the config file exists
    // if it doesn't, throw an error
    // TODO consider creating the config file if it doesn't exist :thinking:
    if (!fs.existsSync(configFile)) {
      console.error("Config file not found");
      process.exit(1);
    }

    // read the file as JSON
    const config: Config = JSON.parse(fs.readFileSync(configFile, "utf-8"));
    this.targetDir = config.targetDir;
  }

  validateFilePath(): boolean {
    // check that a file was provided
    if (!this.filePath) {
      return false;
    }

    // check the path and ensure it exists
    if (!fs.existsSync(this.filePath as PathLike)) {
      return false;
    }

    return true;
  }

  validateTargetPath(): boolean {
    // create the full path to the target file
    const p = path.join(this.targetDir, this?.fileName as string);

    // Does this exact file already exist?
    if (fs.existsSync(p)) {
      return true;
    }

    return false;
  }

  moveToTargetDir() {
    try {
      // Extract the file name from the path
      const fileName = path.basename(this.filePath);

      // Create the full target path
      const targetPath = path.join(this.targetDir, fileName);

      console.log(`Copying file to ${targetPath}...`);

      // Copy the file to the target directory
      fs.copyFileSync(this.filePath, targetPath);

      console.log("File copied successfully.");
      process.exit(1);
    } catch (error) {
      console.error("Error during file copy:", error);
      process.exit(1);
    }
  }

  setFileName(name: string) {
    this.fileName = name;
  }
}
