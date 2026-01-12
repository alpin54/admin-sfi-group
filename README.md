> nextjs-fdd-template-web

# NextJS FDD Template Project Website by AXTB

## prerequisite

- Node.js 18.17 or latest.
- macOS, Windows (including WSL), and Linux are supported.

### Getting Started

Setup new project with nextjs-fdd-template-web by AXTB

- enter terminal and clone this repo to local, just run
  ```bash
  $ git clone https://github.com/ARETE-Std/nextjs-fdd.git project-name-directory
  $ cd project-name-directory
  $ rm -rf .git
  ```
- create new repo for new project in your repo server
- open `package.json` and change value `name`, `description`, `repository url`, `bugs url`, and `homepage` for your new project
- back to terminal and connect repo new project, follow step on bellow
  ```bash
  $ git init .
  $ git remote add origin https://repo-new-project
  $ git checkout -b <branch-name>
  $ git add .
  $ git commit -m "init project"
  $ git pull origin <branch-name>
    if got message "fatal: refusing to merge unrelated histories"
    $ git pull origin <branch-name> --allow-unrelated-histories
    if got message "fatal: Not possible to fast-forward, aborting."
    $ git pull origin <branch-name> --rebase
    if got conflict, solve the conflict and then
    $ git add .
    $ git rebase --continue
    $ git pull origin <branch-name>
  $ git push origin <branch-name>
  ```
- run project
  ```bash
  using npm
  $ npm install
  $ npm install sass@1.32.0 --save-dev
  wait until finished, and then start project
  $ npm run dev