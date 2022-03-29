import type { Arguments, CommandBuilder } from 'yargs';
import axios from 'axios';
import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';
var List = require('prompt-list');

const git = simpleGit();

type Options = {
  task?: number;
};

const getConfigs = () => {
  let rawConfig = fs.readFileSync(path.join(__dirname, '../', 'config.json'), 'utf8');
  return JSON.parse(rawConfig);
};

export const command = 'cb [task]';
export const desc = 'Create branch command';

export const builder: CommandBuilder<Options, Options> = (yargs) => 
  yargs
  .positional('task', { type : 'number', describe: 'Task number'});

const createBranch = async (name: string) => {
  await git.checkout("develop");  
  await git.pull();
  await git.checkoutLocalBranch(name);
};

const getIssues = () => {
  const configs = getConfigs();
  return axios.get(configs.github_issues, {
    headers: {
      Authorization: `Bearer ${configs.github_token}`
    }
  }).then(({ data }) => {
    return data.filter((issue: any ) => !issue.node_id.startsWith("PR_")).map((issue: any) => ({
      title: issue.title,
      number: issue.number
    }));
  })
};

const createBrancName = (name: string) => 
  name.replace(/[^a-zA-Z ]/g, "").split(' ').join('-');

export const handler = async (argv: Arguments<Options>) => {
  let issue;
  const issues = await getIssues() || [];
  
  if (!argv.task) {
    const choices = issues.map((i: any) => `[#${i.number}] ${i.title}`);

    var list = new List({
      name: 'issues',
      message: 'Select issue',
      choices
    });

    const answer = await list.run();
    issue = issues.find((i: any) => answer === `[#${i.number}] ${i.title}`);
  } else {
    issue = issues.find((i: any) => i.number === argv.task);
  }

  if (!issue) {
    process.stdout.write("Issue number is wrong!");
    process.exit(0);
  }

  const branchName = `${issue.number}_${createBrancName(issue.title)}`.toLowerCase();

  process.stdout.write("Creating new branch from develop...");
  await createBranch(branchName);
  process.exit(0);
}