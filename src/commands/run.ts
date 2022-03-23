import { spawn } from 'child_process';
import type { CommandBuilder } from 'yargs';

export const command = 'run';
export const desc = 'Run the project';

export const builder: CommandBuilder<{}, {}> = (yargs) => yargs;

export const handler = async () => {
  process.stdout.write("Starting....");
  const cmd = spawn("foreman", ["start", "-f", "Procfile.dev"]);

  cmd.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
  });

  cmd.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
  });

  cmd.on('error', (error) => {
      console.log(`error: ${error.message}`);
  });

  cmd.on("close", code => {
    console.log(`child process exited with code ${code}`);
  });
};