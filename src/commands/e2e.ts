import { spawn } from 'child_process';
import type { Arguments, CommandBuilder } from 'yargs';

export const command = 'e2e';
export const desc = 'Run the E2E tests';

type Options = {
  headless: boolean | undefined;
};

export const builder: CommandBuilder<Options, Options> = (yargs) => 
  yargs.options({
    headless: { type: 'boolean' },
  });

export const handler = async (argv: Arguments<Options>) => {
  const { headless } = argv;
  process.stdout.write("Starting Cypress....");

  let commandOptions = ["run", "cypress"];

  if (headless) {
    commandOptions = [...commandOptions, "run", "-b", "chrome"];
  } else {
    commandOptions = [...commandOptions, "open"];
  }

  const cmd = spawn("yarn", commandOptions);

  cmd.stdout.on("data", data => {
    console.log(data.toString());
  });

  cmd.stderr.on("data", data => {
    console.log(data.toString());
  });

  cmd.on('error', (error) => {
      console.log(error.message);
  });

  cmd.on("close", code => {
    console.log(`child process exited with code ${code}`);
  });
};