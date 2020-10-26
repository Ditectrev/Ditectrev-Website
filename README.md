# Ditectrev website v3

## Description

...

- Production environment: [https://...firebaseapp.com/](https://...firebaseapp.com/)
- Staging environment: [https://...firebaseapp.com/](https://...firebaseapp.com/)

## Commands

List of useful commands during development.

### docker

- `docker build -t IMAGE_NAME .` - build Docker image.
- `docker exec -it CONTAINER_NAMES sh` - enter the container.
- `docker images` - list Docker images.
- `docker ps` - show Docker container status.
- `docker run -p 4200:4200 IMAGE_NAME` - run Docker image with a specific image name.
- `docker stop CONTAINER_ID` - stop running container with specific ID.

### git

- `git add .` - add all changed files in the repository to the index.
- `git branch` - check project branches and highlight active branch.
- `git commit -m "commit message"` - create commit with a message.
- `git commit --amend` - edit unpushed commit with opening a default text editor.
- `git commit --amend -m "COMMIT MESSAGE"` - edit unpushed commit directly from command line.
- `git checkout BRANCH_NAME` - switch to a certain branch.
- `git diff --color-words` - display difference between commit, and working tree with distinguishing between words colors without breaking line where differences occured.
- `git diff --stat` - show number of changed lines for each file.
- `git log --all --decorate --graph --oneline` - log commits of repository in a human friendly way.
- `git merge --no-ff --no-commit BRANCH_NAME` - safe merging branch from certain branch to "master". Done after `git checkout BRANCH_NAME`, `git pull`, `git checkout master`, `git pull`.
- `git pull` - update local version of a project's repository from remote.
- `git push` - push commit to the repository.
- `git push --delete origin v0.0.0` - delete remote tag.
- `git push --tags` - push tags to the repository.
- `git push origin master:BRANCH_NAME` - push local Git branch to "master" branch in remote.
- `git reset HEAD~1` - remove unpushed commit.
- `git rm -r --cached ."` - remove completely, sometimes if .gitignore will be not updated just run it before git add.
- `git status` - display differences between the index file, and the current HEAD commit.
- `git status -sb` - same as `git status`, but in shorter version, and showing current branch.
- `git tag` - show tags from the repository.
- `git tag -a v0.0.0 -m "tag message"` - create tag on current commit with specific version, and message.
- `git tag -a v0.0.0 123abcde -m "Message here"` - add tag to certain commit.
- `git tag -d v0.0.0` - delete local tag.
- `git tag v0.0.0 v0.0.0^{} -f -m "new name here"` - change tag message of some specific tag.

### ng

- `ng build --project=MYAPP` - build project.
- `ng e2e` - run end-to-end tests.
- `ng generate app MYAPP` - generate new application, in Nx there can be multiple applications, and libraries in the same workspace.
- `ng generate component component-name --project=MYAPP` - generate new component, can be used as `ng generate directive|pipe|service|class|guard|interface|enum|module`.
- `ng generate lib mylib` - generate new library, in Nx there can be multiple applications, and libraries in the same workspace.
- `ng help` - show all available commands of the CLI.
- `ng lint` - perform static code analysis.
- `ng serve` - build, and serve project.
- `ng serve --project=MYAPP` - run local server in production environment, navigate to `http://localhost:4200/` in order to access it. Changes are detected automatically, and will server will reload the page once they will be detected.
- `ng test` - run unit tests.
- `ng test LIB_NAME` - run unit tests for particular lib.
- `ng version` - show version of Angular with its core dependencies.
- `ng update` - check which packages are ready to update.
- `ng update --all` - update all packages.
- `ng update PACKAGE_NAME` - update certain package.

### npm

- `npm audit` - display known vulnerabilities in dependencies.
- `npm audit fix` - fix known vulnerabilities in dependencies.
- `npm cache clean --force` - clean cache of npm.
- `npm info PACKAGE_NAME version` - show the newest version of certain package.
- `npm install PACKAGE_NAME@VERSION --save-exact` - install exact package version without "~" and "^", i.e. don't update automatically.
- `npm list` - show versions of installed packages in project.
- `npm list | grep PACKAGE_NAME` - show package details with its own dependencies.
- `npm list -g` - show versions of installed packages globally.
- `npm list --depth=0` - show versions of installed packages in project without its own dependencies.
- `npm list --depth=0 -g` - show versions of installed packages globallyn without its own dependencies.
- `npm outdated` - show outdated dependencies.
- `npm run dep-graph` - run dependency graph.
- `npm test -t "test-name"` - run only single test.

### Others

- `npx compodoc -p apps/ditectrev/tsconfig.app.json` - generate documentation.
- `npx jest --clearCache` - clear cache for Jest.
- For Angular CLI, and Nx more can be found on [Nx official project website](https://nrwl.io/nx/guide-nx-workspace), or [Angular CLI documentation](https://angular.io/cli). To simplify management of these commands Angular Console, as an extension to Visual Studio Code is used for more sophisticated scenarios.
- Reverse engineering can be done using [ngrev](https://github.com/mgechev/ngrev)

## Commits convention

- **Add:** - new functionality has been added.
- **Change:** - changes in methods, project setup, variables, etc.
- **Delete:** - something has been removed.
- **Fix:** - part of code/functionality has been performed.
- **Improve:** - something has been improved, i.e. error handling, security etc.
- **Migrate:** - project has been upgraded to newer versions of dependencies.
- **Refactor:** - signifcant enough change in the logic, which required refactoring.
- **Update:** - at least one of application's dependencies has been updated.
- **Tags to commits** - First commit, then add appropriate tag to the new commit. Otherwise the tag will be placed on an old commit.

## Security scanning results

| Name of a web scanner                      | Score                                                                                                             |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Checkbot: SEO, Web Speed & Security Tester | [92%](https://chrome.google.com/webstore/detail/checkbot-seo-web-speed-se/dagohlmlhagincbfilmkadjgmdnkjinl?hl=en) |
| CryptCheck                                 | [A](https://tls.imirhil.fr/https/thesisapp-16048.firebaseapp.com)                                                 |
| ImmuniWeb                                  | [A](https://www.immuniweb.com/websec/?id=Oy27vLRH)                                                                |
| Mozilla Observatory                        | [A+](https://observatory.mozilla.org/analyze/thesisapp-16048.firebaseapp.com)                                     |
| Pentest-Tools                              | [Low security risk](https://pentest-tools.com/home)                                                               |
| Security Headers                           | [A](https://securityheaders.com/?q=https://thesisapp-16048.firebaseapp.com)                                       |
| SiteCheck                                  | [Low security risk](https://sitecheck.sucuri.net/results/https/thesisapp-16048.firebaseapp.com)                   |
| Qualys SSL Labs                            | [A+](https://www.ssllabs.com/ssltest/analyze.html?d=thesisapp%2d16048.firebaseapp.com&latest)                     |

## Running/testing

2 changes have to be done when running and/or testing this, depending by if Firebase or NestJS is being used. Check `server/app.module.ts` and `server/main.ts` (`await nestApp.listen(4479);`).
