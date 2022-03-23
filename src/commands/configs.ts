
import type { Arguments, CommandBuilder } from 'yargs';
import fs from 'fs';
import path from 'path';

type Options = {
  setGitToken: string | undefined;
};

export const command: string = 'configs';
export const desc: string = 'Cli configs';

const getConfigs = () => {
  let rawConfig = fs.readFileSync(path.join(__dirname, '../', 'config.json'), 'utf8');
  return JSON.parse(rawConfig);
};

const updateConfigs = (configs: { [key:string]: string}) => {
  fs.writeFileSync(path.join(__dirname, '../', 'config.json'), JSON.stringify(configs, null, 2));
};

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
      setGitToken: { type: 'string', describe: 'Set github token' },
    });

export const handler = (argv: Arguments<Options>): void => {
  const { setGitToken } = argv;  
  const configs = getConfigs();

  if (setGitToken) {
    const newConfigs = {
      ...configs,
      github_token: setGitToken || configs.github_token,
    };
    updateConfigs(newConfigs);
    process.exit(0);
  }

  console.log(configs);
  process.exit(0);
};