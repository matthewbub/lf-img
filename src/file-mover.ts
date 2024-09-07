import path from "path";
import fs from "fs";
import { cwd } from "./cwd";

export class FileMover {
  filePath: string;
  targetDir: string = "./";

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

  validate() {
    // check that a file was provided
    if (!this.filePath) {
      console.error("Please provide a file to upload");
      process.exit(1);
    }

    // check the path and ensure it exists
    if (!fs.existsSync(this.filePath)) {
      console.error("File does not exist");
      process.exit(1);
    }
  }

  private getMimeType(filePath: string) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
      case ".png":
        return "image/png";
      case ".jpg":
        return "image/jpeg";
      case ".jpeg":
        return "image/jpeg";
      case ".gif":
        return "image/gif";
      default:
        throw new Error(`Unsupported file type: ${ext}`);
    }
  }

  moveToTargetDir() {
    try {
      this.validate();

      const fileName = path.basename(this.filePath); // Extract the file name from the path
      const targetPath = path.join(this.targetDir, fileName); // Create the full target path

      console.log(`Copying file to ${targetPath}...`);

      // Copy the file to the target directory
      fs.copyFileSync(this.filePath, targetPath);

      console.log("File copied successfully.");
    } catch (error) {
      console.error("Error during file copy:", error);
      process.exit(1);
    }
  }
}
