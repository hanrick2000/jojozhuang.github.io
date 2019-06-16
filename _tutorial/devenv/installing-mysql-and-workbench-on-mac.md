---
layout: tutorial
key: tutorial
title: "Installing MySQL and Workbench on Mac"
index: 31
category: devenv
image: code.png
date: 2016-03-01
postdate: 2017-10-30
tags: [MySQL, MySQL Workbench]
categories:
- blog
---

> Install MySQL database and MySQL Workbench on Mac.

## 1. MySQL Database
[MySQL](https://www.mysql.com/) is the most popular Open Source Relational SQL Database Management System. MySQL is one of the best RDBMS being used for developing various web-based software applications.
## 2. Installing MySQL
### 2.1 Downloading MySQL
Go to [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/), choose free MySQL Community Server,  select 'Mac OS X' and download the DMG Archive.
### 2.2 Installing MySQL
![image](/public/images/devops/31/downloadmysql.png){:width="800px"}
Then, follow the wizard to install MySQL.
![image](/public/images/devops/31/installmysql.png){:width="600px"}
At the end of the installation, there will be a popup dialog with showing the database connection information. Note down the password for root user, `root@localhost: VAJJ&kNor7y<`.
```
[Note] A temporary password is generated for root@localhost: VAJJ&kNor7y<

If you lose this password, please consult the section How to Reset the Root Password in the MySQL reference manual.
```
![image](/public/images/devops/31/initialpassword.png){:width="400px"}  
### 2.3 Starting MySQL Instance
Go to System Preferences->MySQL.
![image](/public/images/devops/31/mysqlservice.png){:width="700px"}
Click the 'Start MySQL Server' button to launch MySQL database.
![image](/public/images/devops/31/mysqlstart.png){:width="600px"}
You should see the status of MySQL is 'running'.
![image](/public/images/devops/31/mysqlrunning.png){:width="600px"}

## 3. Installing MySQL Workbench
### 3.1 Downloading MySQL Workbench
MySQL Workbench is a client tool to manage MySQL database. Go to [https://dev.mysql.com/downloads/workbench/](https://dev.mysql.com/downloads/workbench/), select 'Mac OS X' and download MySQL Workbench.
![image](/public/images/devops/31/downloadworkbench.png){:width="800px"}
### 3.2 Installing MySQL Workbench
Then, follow the wizard to install MySQL Workbench.  
### 3.3 Creating New Connection
After installation, launch MySQL Workbench.
![image](/public/images/devops/31/mysqlworkbench.png){:width="800px"}
Click the Plus button to add a new connection, specify the connection name.
![image](/public/images/devops/31/addnewconnection.png){:width="800px"}
Set Username to 'root', click 'Store in Keychain ...', provide the password which was noted down in Step 2.2.
![image](/public/images/devops/31/password.png){:width="500px"}
Click the 'Test Connection' button. Unfortunately, fail to connect.
![image](/public/images/devops/31/failconnect.png){:width="500px"}
Save the connection any way. Then, double click on this connection, in the 'Password Expired' popup dialog, provide the new password(eg.abc123), click Enter.
![image](/public/images/devops/31/resetpassword.png)
Input the new password, and click OK.
![image](/public/images/devops/31/newpassword.png)
If you test the connection again. You will see the connection between MySQL Workbench and MySQL database is created successfully.
![image](/public/images/devops/31/testconnection.png){:width="500px"}
Once the connection is successfully setup, double click on it or right-click on it -> Open connection. You will see a new window where you can manage your MySQL database.
![image](/public/images/devops/31/workbenchconnected.png)

## 4. Creating Database and Table
In MySQL Workbench, execute following sql script to create a new database named `jsptutorial`.
```sql
CREATE DATABASE  IF NOT EXISTS `jsptutorial`
```
![image](/public/images/devops/31/createdb.png)
Then, right-click on SCHEMAS->Refresh All. The new database shows up.
![image](/public/images/devops/31/refreshdb.png)
Run the following script to create a table named `Product`, which contains three columns.
```sql
USE `jsptutorial`;
CREATE TABLE `Product` (
  `ProductId` int(11) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(50) DEFAULT NULL,
  `Price` double NOT NULL,
  PRIMARY KEY (`ProductId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
```
![image](/public/images/devops/31/createtable.png)
Run the following sql script to create initial data.
```sql
INSERT INTO `Product` VALUES (1,'Xbox',100),(2,'PS4',400),(3,'iPhone',699);
```
![image](/public/images/devops/31/createdata.png)
Run the following script to show all data in table `Product`.
```sql
SELECT * FROM jsptutorial.Product;
```
![image](/public/images/devops/31/showdata.png)

## 5. References
* [MySQL Documentation](https://dev.mysql.com/doc/refman/8.0/en/)
* [MySQL Tutorial](https://www.tutorialspoint.com/mysql/)
