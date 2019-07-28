---
layout: post
key: blog
title: "Installing Jenkins in Docker"
date: 2016-10-08
subcategory: blog
tags: [Docker, Jenkins]
---

> Introduce how to create Jenkins container in Docker.

## 1. What is Jenkins?
[Jenkins](https://jenkins.io/index.html) is a powerful application that allows continuous integration and continuous delivery of projects, regardless of the platform you are working on. It is a free source that can handle any kind of build or continuous integration. You can integrate Jenkins with a number of testing and deployment technologies.

## 2. Creating Jenkins Container in Docker
### 2.1 Installing Docker and Kitematic
If you haven’t installed Docker and Kitematic, please install Docker Toolbox by referring to another posting [Installing Docker Toolbox and Kitematic on Mac]({% link _tutorial/docker/installing-docker-toolbox-and-kitematic-on-mac.md %}).
### 2.2 Creating Jenkins Container
Search jenkins in Kitematic, select the official image, and click Create button.
![image](/public/images/blog/2016-10-08/dockersearch.png)
Jenkins image will be downloaded and a Jenkins container will be created and running.
![image](/public/images/blog/2016-10-08/dockerkitematic.png)
### 2.3 Setting up Jenkins
Click the Preview button, web browser will be opened to access Jenkins application. You need to find the password in the given file to unlock Jenkins.
![image](/public/images/blog/2016-10-08/dockerunlock.png)
Open container terminal by clicking on the 'EXEC' button in Kitematic. Run the following commands to get the password from secret file `initialAdminPassword`.
```raw
$ cd var/jenkins_home/secrets/
$ more initialAdminPassword
```
![image](/public/images/blog/2016-10-08/dockerpassword.png){:width="600px"}
Copy this password and paste it to the input box in Getting Started page, continue.
![image](/public/images/blog/2016-10-08/dockersetpassword.png)
In the next page, select 'Install Suggested Plugins'.
![image](/public/images/blog/2016-10-08/dockerplugin.png)
Jenkins starts to install plugins.
![image](/public/images/blog/2016-10-08/dockerinstallplugin.png)
In the next page, you need to create an admin user.
![image](/public/images/blog/2016-10-08/dockercreateuser.png)
Setup is complete, ready for use.
![image](/public/images/blog/2016-10-08/dockerready.png)
Finally, we see the homepage of Jenkins, which is hosted in Docker Container.
![image](/public/images/blog/2016-10-08/dockerhomepage.png)

### 2.4 Commands for Jenkins
The following commands when appended to the Jenkins instance URL will carry out the relevant actions on the Jenkins instance.
* http://192.168.99.100:32769/cli/ - full list of commands
* http://192.168.99.100:32769/restart - restart jenkins

## 3. References
* [Official Website for Jenkins](https://jenkins.io/index.html)
* [Installing Jenkins](https://jenkins.io/doc/book/getting-started/installing/)
* [Jenkins Tutorial](https://www.tutorialspoint.com/jenkins/index.htm)
