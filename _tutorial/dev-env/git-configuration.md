---
layout: tutorial
key: tutorial
title: "Git Configuration"
index: 2124
subcategory: dev-env
date: 2019-11-19
tags: [Git, GitHub]
---

> Basic Git configuration.

## 1. Configuration Levels

Level   | Configuration File     | Command
--------|------------------------|---------------------
System  | /etc/gitconfig         | git config --system
User    | ~/.gitconfig           | git config --global
Project | my_project/.git/config | git config

## 2. Git auto-completion
1) Go to https://github.com/git/git/tree/master/contrib/completion, download `git-completion.bash`.  
2) Save the file to user's root directory, eg. /Users/Johnny  
3) Add the following lines to the bottom of `.bash_profile`.  
```bash
if [ -f ~/.git-completion.bash ]; then
   source ~/.git-completion.bash
fi
```
4) Open a new terminal, try to type `git h` and hit TAB, auto completion will work and make the command to `git help`.

## 3. Git help
Type `git help` to get the help document. To get document for a specific command, just append the command name, eg. `git help branch`.

## 7. References
* [ Git Essential Training: The Basics](https://www.linkedin.com/learning/git-essential-training-the-basics/basic-git-configuration?u=57692769)
