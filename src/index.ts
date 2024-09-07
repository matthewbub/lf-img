#!/usr/bin/env node

import { Command } from "commander";
import { init, move } from "./actions";

const program = new Command();
program
  .name("lf-img")
  .description("CLI tool for managing images in a local directory")
  .version("0.0.1");

program.command("init").description("initialize the project").action(init);

program
  .command("move")
  .description("move an image to the target directory")
  .option("-f, --file <file>", "the file to upload")
  .option("-n, --name <name>", "the name of the image")
  .option("-u, --upsert", "update an existing image")
  .action(move);

program.parse();
