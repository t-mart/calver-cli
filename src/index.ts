#!/usr/bin/env node
import process from "node:process";

import calver from "calver";
import { Command } from "commander";

interface IncOptions {
  levels: string;
  format: string;
}
interface ValidateOptions {
  format: string;
}

const program = new Command();

program.name("calver").description("CalVer CLI tool suite");

program
  .command("inc")
  .description("Increment a version")
  .argument("[version]", "The version to increment", "")
  .requiredOption(
    "-f, --format <format>",
    "The format string of version. (See https://github.com/muratgozel/node-calver)"
  )
  .requiredOption(
    "-l, --levels <levels>",
    `The part(s) of version to increment. Such as "calendar" or "calendar.minor"`
  )
  .action((version: string, options: IncOptions) => {
    try {
      console.log(calver.inc(options.format, version, options.levels));
    } catch (error) {
      console.error(error);
      process.exitCode = 2;
    }
  });

program
  .command("validate")
  .description("Validate a version")
  .argument("<version>", "The version to increment")
  .requiredOption(
    "-f, --format <format>",
    "The format string of version. (See https://github.com/muratgozel/node-calver)"
  )
  .action((version: string, options: ValidateOptions) => {
    try {
      const isValid = calver.isValid(options.format, version);
      console.log(isValid ? "valid" : "invalid");
      process.exitCode = isValid ? 0 : 1;
    } catch (error) {
      console.error(error);
      process.exitCode = 2;
    }
  });

program.parse();
