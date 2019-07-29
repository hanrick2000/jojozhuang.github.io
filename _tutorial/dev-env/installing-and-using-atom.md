---
layout: tutorial
key: tutorial
title: "Installing and Using Atom"
index: 2124
subcategory: dev-env
date: 2017-10-15
tags: [Atom, Markdown]
---

> Introduce how to install and use Atom to create MarkDown file and write code.

I use [Atom](https://atom.io/) to create blogs for this website. The main reason I choose Atom is because it is a cross-platform text editor. You can have the same user experience when using it on Mac as well as on Linux.

## 1. What is Atom?
Atom is a free and open-source text editor with plug-ins supported. It is available on OS X, Windows, or Linux, a cross-platform editor! You can use Atom as generic text editor to edit Markdown documents. You can also use it as IDE for software development. For example, it supports you to develop responsive website with AngularJS. The highlight feature in Atom makes easy for you to edit source code in different formats, like javascript, html, etc.
![image](/public/images/devops/2124/atom.png)  

## 2. Installing Atom
Go to [https://atom.io/](https://atom.io/), download the proper installer of different versions. For Mac or Windows, just click the installer and follow the wizard to install it. For linux, run the following commands in terminal to install it.
```raw
$ sudo rpm -i atom_amd64.rpm  // for RedHat
$ sudo dpkg -i atom_amd64.deb // for Ubuntu
```

## 3. Plug-In System for Atom
There are lots of plug-ins(Packages) available for Atom. They make Atom more powerful.

### 3.1 Searching and Installing Plug-In
Atom->Preferences->Install, search package. Click 'Install' button of the package you want to install.
![image](/public/images/devops/2124/installplugin.png){:width="800px"}  

### 3.2 Popular Plug-Ins
* Compare File  
[https://atom.io/packages/compare-files](https://atom.io/packages/compare-files)  
Select two files, then Command + Shift + P, search 'Compare', click command button, you will see the diff.
![image](/public/images/devops/2124/compare.png)  

* Minimap  
[https://atom.io/packages/minimap](https://atom.io/packages/minimap)  
After it is installed, you will see a small map at the right of the editor. This is useful when the document you are editing is very large and has many pages.
![image](/public/images/devops/2124/minimap.png){:width="700px"}  

* Markdown-Writter  
[https://atom.io/packages/markdown-writer](https://atom.io/packages/markdown-writer)  
Below steps show how to insert table into Markdown document.  
1) Put the cursor to where you want to insert table, Command + Shift + P, search 'markdown writer: insert table'.  
![image](/public/images/devops/2124/tablekey.png){:width="600px"}  
2) Specify the number for rows and columns.  
![image](/public/images/devops/2124/table64.png){:width="600px"}  
3) Table is inserted to document. You can now add content into it.  
![image](/public/images/devops/2124/tablecreated.png){:width="600px"}  
4) Table shown in html page.  
![image](/public/images/devops/2124/tablehtml.png){:width="600px"}  

* Atom-Shortcuts  
[https://atom.io/packages/atom-shortcuts](https://atom.io/packages/atom-shortcuts)  
Simply hit ctrl + \` (ctrl + backtick) and you will get a cheatsheet on your screen immediately.
The most important shortcut key is 'Command + Shift + P'(Toggle command palette).
![image](/public/images/devops/2124/shortcut.png)  

## 4. Working with Markdown
### 4.1 Markdown Syntax
Before trying to use Markdown to edit documents, you should first get familiar with the Markdown syntaxes.
Some syntax samples for [Github Markdown](https://guides.github.com/features/mastering-markdown/).

### 4.2 Markdown Preview in Atom
When using Atom, you can use the preview function before submitting the document.  
Right click on the file you are editing, choose Markdown Preview at the top of context menu.
![image](/public/images/devops/2124/preview.png)  

## 5. References
* [https://atom.io/](https://atom.io/)
