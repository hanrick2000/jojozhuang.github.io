---
layout: tutorial
key: tutorial
title: "Deploying Socket.IO App to Heroku"
index: 2636
category: react-app
breadcrumb: [Tutorial, Frontend, React App]
date: 2018-07-30
tags: [Nodejs, Heroku]
---

> Introduce how to deploy course player app built with Socket.IO to Heroku.

## 1. Socket.IO App
In the posting [Building Course Player with Node.js and Socket.IO]({% link _tutorial/react-app/building-course-player-with-nodejs-and-socketio.md %}), I introduced how to build an course player with [Socket.IO](https://socket.io/). In this posting, I will introduce how to deploy this Socket.IO to [Heroku](https://www.heroku.com/).

## 2. Heroku
[Heroku](https://www.heroku.com/) is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.
### 2.1 Sign Up
Go to https://signup.heroku.com/ create a free Heroku account.
### 2.2 Installing Heroku CLI
Go to https://devcenter.heroku.com/articles/heroku-cli#download-and-install to download proper installer.
### 2.3 Getting Started
First, read the official tutorial [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) to get familiar with the basic functions of Heroku. Below are some of the highlights from the tutorial.  
1) Log into Heroku
```sh
$ heroku login
Enter your Heroku credentials.
Email: jojozhuang@gmail.com
Password: **********
```
2) Create Heroku App
```sh
$ heroku create                        // no name, a random name will be assigned to the app
$ heroku create course-player-socketio // create app with the given name
```
3) View logs
```sh
$ heroku logs --tail
```
4) Scale the app
```sh
$ heroku ps //check how many dynos are running
$ heroku ps:scale web=0 // scale down
$ heroku ps:scale web=1 // scale up
```
5) Run the app locally
```sh
$ heroku local web // same as 'npm start'
```
6) Heroku Console
```sh
$ heroku run bash
Running bash on ⬢ damp-springs-52045... up, run.3598 (Free)
~ $ ls
Procfile  README.md  app.json  index.js  node_modules  package-lock.json  package.json	public	test.js  views
```
* Type 'exit' to quit the console.

## 3. Deployment
### 3.1 Cloning Source Code
```sh
$ git clone https://github.com/jojozhuang/course-player-socketio
$ cd course-player-socketio
```
### 3.2 Creating App on Heroku
```sh
$ heroku create course-player-socketio
Creating ⬢ course-player-socketio... done
https://course-player-socketio.herokuapp.com/ | https://git.heroku.com/course-player-socketio.git
```
* When creating an app, a git remote (called heroku) is also created and associated with the local git repository.

### 3.3 Pushing Files to Heroku
```sh
$ git push heroku master
Counting objects: 57, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (53/53), done.
Writing objects: 100% (57/57), 14.55 MiB | 711.00 KiB/s, done.
Total 57 (delta 2), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Node.js app detected
remote:
remote: -----> Creating runtime environment
remote:        
remote:        NPM_CONFIG_LOGLEVEL=error
remote:        NODE_VERBOSE=false
remote:        NODE_ENV=production
remote:        NODE_MODULES_CACHE=true
remote:
remote: -----> Installing binaries
remote:        engines.node (package.json):  unspecified
remote:        engines.npm (package.json):   unspecified (use default)
remote:        
remote:        Resolving node version 8.x...
remote:        Downloading and installing node 8.11.3...
remote:        Using default npm version: 5.6.0
remote:
remote: -----> Restoring cache
remote:        Skipping cache restore (not-found)
remote:
remote: -----> Building dependencies
remote:        Installing node modules (package.json + package-lock)
remote:        added 98 packages in 7.015s
remote:
remote: -----> Caching build
remote:        Clearing previous node cache
remote:        Saving 2 cacheDirectories (default):
remote:        - node_modules
remote:        - bower_components (nothing to cache)
remote:
remote: -----> Pruning devDependencies
remote:        Skipping because npm 5.6.0 sometimes fails when running 'npm prune' due to a known issue
remote:        https://github.com/npm/npm/issues/19356
remote:        
remote:        You can silence this warning by updating to at least npm 5.7.1 in your package.json
remote:        https://devcenter.heroku.com/articles/nodejs-support#specifying-an-npm-version
remote:
remote: -----> Build succeeded!
remote: -----> Discovering process types
remote:        Procfile declares types     -> (none)
remote:        Default types for buildpack -> web
remote:
remote: -----> Compressing...
remote:        Done: 32.8M
remote: -----> Launching...
remote:        Released v3
remote:        https://course-player-socketio.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/course-player-socketio.git
 * [new branch]      master -> master
```
If you need to push some updated files, run following commands.
```sh
$ git add .
$ git commit -m "<comments>"
$ git push heroku master
```

## 4. Testing
Open web browser, access 'https://course-player-socketio.herokuapp.com/'. The player is working now.
![image](/public/images/frontend/2636/home.png)  
Click the 'Play' button and drag to slider bar.
![image](/public/images/frontend/2636/play.png)  

## 5. Reference
* [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
* [Deploy Static Site Heroku](https://gist.github.com/wh1tney/2ad13aa5fbdd83f6a489)
* [How to Deploy a Static Site to Heroku](http://blog.teamtreehouse.com/deploy-static-site-heroku)
* [Deploy React and Express to Heroku](https://daveceddia.com/deploy-react-express-app-heroku/)
* [Lessons learned from deploying my first full-stack web application](https://medium.freecodecamp.org/lessons-learned-from-deploying-my-first-full-stack-web-application-34f94ec0a286)
* [Using config and environment variables for client and back-end use with Javascript](https://www.jaygould.co.uk/devops/2017/08/18/using-environment-config-variables-node.html)
* [Working with Environment Variables in Node.js](https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html)
* [Express Tutorial Part 7: Deploying to production](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)
* [Deployment @ create-react-app](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment)
* [Updating Git remotes](https://devcenter.heroku.com/articles/renaming-apps#updating-git-remotes)
