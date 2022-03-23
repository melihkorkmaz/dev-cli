# DEV CLI

It's a helper cli tool to create branch, commit, run app and run E2E tests.

## Get Started
You need to install it globally. After pull this repo to your local run;

```
cd dev-cli
yarn
yarn build
yarn deploy
```

#### Mac or Linux Users
If you use MacOS or Linux you might need to add build directory to your `bashprofile` or `profile`.

`npm root -g`: This is going to show where you install your global npm packages. 

Open an editor for your profile
```
nano ~/.profile
```
Into the profile file add this;
```
export PATH="$PATH:[PATH_YOUR_GLOBAL_NPM_PACKAGES_FROM_ABOVE_COMAND]/dev-cli"
```

You might need to also give access to your `./build` file under project directory.

## Commands
To see documentation run `dev --help`
First you need to setup your git token for git API.

#### Configs
`dev configs` list your configs. You will see token is empty. To set token run;
```
dev configs setGitToken YOUR_TOKEN
```
It's going to update your local config file.

**To able to run below command you should be in oerwrite project directory**

#### Create new branch
Run: `dev cb`
This is going to list your open tasks from github issues. Use your keyboard to select the task you want.

You can also run `dev cb 1234` where 1234 is task number. So it's going to create the branch automatically like `1234_my-task-title`

#### Commit
After stage your changes run:
```
dev commit "My message"
```

It's automatically creates a commit with message `[#1234] My Message` (where 1234 the task number from branch)

#### Run
To run application
```
dev run
```

#### Run End to End Tests
```
dev e2e
```

also if you want to run e2e tests in headless mod you can use;
```
dev e2e --headless
```