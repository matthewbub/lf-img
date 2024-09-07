import path from "path";
import fs from "fs";
import { cwd } from "./cwd";

export class FileMover {
  filePath: string;
  targetDir: string = "./";

  // the name of the file if it was renamed
  fileName?: string;

  constructor(file: string) {
    this.setTargetDir();
    this.filePath = path.resolve(process.cwd(), file);
  }

  private setTargetDir() {
    const configFile = path.resolve(cwd, "config.json");
    if (!fs.existsSync(configFile)) {
      console.error("Config file not found");
      process.exit(1);
    }
    const config = JSON.parse(fs.readFileSync(configFile, "utf-8"));
    this.targetDir = config.targetDir;
  }

  validateFilePath(): boolean {
    // check that a file was provided
    if (!this.filePath) {
      return false;
    }

    // check the path and ensure it exists
    if (!fs.existsSync(this.filePath)) {
      return false;
    }

    return true;
  }

  validateTargetPath(): boolean {
    // Does this exact file already exist?
    if (fs.existsSync(this.targetDir + this.fileName)) {
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
