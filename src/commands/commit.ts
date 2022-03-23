import type { Arguments, CommandBuilder } from 'yargs';
import simpleGit, { BranchSummaryBranch } from 'simple-git';

const git = simpleGit();
export const command = 'commit [message]';
export const desc = 'Create commit';

type Options = {
  message: string;
};

export const builder: CommandBuilder<Options, Options> = (yargs) => 
  yargs
    .positional('message', 
      { 
        type : 'string', 
        demandOption: true,
        describe: 'Commit message'
      });

export const handler = async ({ message }: Arguments<Options>) => {
  if (!message) {
    process.stdout.write('Please add message');
    return;
  }

  const localBranches = await git.branchLocal();
  const currentBranch = Object.values(localBranches.branches).find((c:BranchSummaryBranch) => c.current);

  if(!currentBranch) {
    process.stdout.write('No active branch');
    return;
  }

  const taskNumber = currentBranch.name.split('_')[0] || '0000';
  const messageWithTaskNumber = `[#${taskNumber}] - ${message}`;

  process.stdout.write(`Commiting ${messageWithTaskNumber}`);
  await git.commit(messageWithTaskNumber);
  process.exit(0);
}