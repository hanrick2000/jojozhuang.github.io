---
layout: tutorial
key: popular
title: "Setting up Personal Website on GitLab Pages"
index: 1602
subcategory: jekyll
date: 2018-06-06
tags: [GitLab Pages]
---

> Introduce how to setup Jekyll website on GitLab Pages.

## 1. GitLab Pages
[GitLab Pages](https://about.gitlab.com/product/pages/) are very similar to [GitHub Pages](https://pages.github.com/). GitLab Pages also supports custom domain names and SSL certificates and includes a continuous integration platform. GitLab Pages supports static websites and builds any Static Site Generator (SSG), such as Jekyll, Hugo, Hexo, Middleman and Pelican.

There are two ways of getting started with GitLab Pages: either fork an existing project, or create a new one. In this posting, I will introduce how to migrate my personal Jekyll website from GitHub to GitLab.

## 2. Fork GitLab Pages Examples
### 2.1 Fork Existing Jekyll Project
Fork the repository https://gitlab.com/pages/jekyll. After fork, you will see a new project in the list.
![image](/assets/images/jekyll/1602/fork-jekyll.png)
### 2.2 Remove the Fork Relationship
Go to Settings > General, scroll down and expand 'Advance' and click the "Remove fork relationship" button.
![image](/assets/images/jekyll/1602/remove-fork-relationship.png)
### 2.3 Trigger Build
Edit any file to trigger a build. For example, edit file 'README.md'.
![image](/assets/images/jekyll/1602/edit-readme.png)
Stage and Commit the change.
![image](/assets/images/jekyll/1602/stage-and-commit.png)
Then merge the request.
![image](/assets/images/jekyll/1602/merge-request.png)
The pipeline is started automatically to trigger a new build.
![image](/assets/images/jekyll/1602/pipeline-pending.png)
After build is finished, merge the change.
![image](/assets/images/jekyll/1602/merge-after-build.png)
The pipeline starts running again.
![image](/assets/images/jekyll/1602/pipeline-build.png)
This time, the project is built and deployed.
![image](/assets/images/jekyll/1602/pipeline-deploy.png)
### 2.4 Test Page
Go to Settings->Page, the website url hosted in GitLab Pages appears, click on it.
![image](/assets/images/jekyll/1602/settings-pages.png)
We can see the Jekyll site.
![image](/assets/images/jekyll/1602/test-website.png)
### 2.5 Change Domain
Notice the URL of the site is https://jojozhuang.gitlab.io/jekyll/. We can change it to other domains, for example, https://jojozhuang.gitlab.io/

Go to Settings > General, put the domain name and click "Change path" button.
![image](/assets/images/jekyll/1602/change-path.png)
Go to Settings->Page, the url is updated.
![image](/assets/images/jekyll/1602/domain-changed.png)
Click the url and you will see the site is in new domain(Please wait for few minutes if you don't see it immediately). However, there is something wrong here, the page doesn't look good. This is because the main.css file is not linked properly.
![image](/assets/images/jekyll/1602/new-domain.png)
We are able to see the cause with chrome debugger.
![image](/assets/images/jekyll/1602/main-css.png)
To solve the issue, edit `_config.yml`, set `baseurl` to empty string. Submit and merge the request.
![image](/assets/images/jekyll/1602/change-baseurl.png)
After the site is successfully built and deployed, we can access it with the new domain.
![image](/assets/images/jekyll/1602/test-new-domain.png)

## 3. Migrate Existing Site
### 3.1 Copy Files
Clone the project from https://github.com/jojozhuang/jojozhuang.github.io to local, remove all existing files and copy all of the files from github repository into this folder.

Some configuration files need to be updated.
* Gemfile
* .gitlab-ci.yml

### 3.2 Gemfile
```raw
source "https://rubygems.org"
ruby RUBY_VERSION

# This will help ensure the proper Jekyll version is running.
gem "jekyll", "3.8.5"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem "jekyll-seo-tag"
```
### 3.3 .gitlab-ci.yml
```yml
image: ruby:2.6

variables:
  JEKYLL_ENV: production
  LC_ALL: C.UTF-8

before_script:
  - bundle install

test:
  stage: test
  script:
  - bundle exec jekyll build -d test
  artifacts:
    paths:
    - test
  except:
  - master

pages:
  stage: deploy
  script:
  - bundle exec jekyll build -d public
  artifacts:
    paths:
    - public
  only:
  - master
```
* `public` is the default folder for GitLab Pages.

### 3.4 Test
After the site is successfully compiled and deployed, we are able to access it. The migration is done.
![image](/assets/images/jekyll/1602/test-migration.png)

## 4. References
* [GitLab Pages Getting Started](https://docs.gitlab.com/ee/user/project/pages/index.html)
* [Getting started with GitLab CI/CD](https://docs.GitLab.com/ee/ci/quick_start/README.html)
* [GitLab Google Kubernetes Engine integration](https://about.GitLab.com/google-cloud-platform/)
* [How to Publish a Website with GitLab Pages](https://www.youtube.com/watch?v=TWqh9MtT4Bg)
* [What is GitLab Pages?](https://about.gitlab.com/product/pages/)
