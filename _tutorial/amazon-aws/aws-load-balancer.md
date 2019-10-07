---
layout: tutorial
key: tutorial
title: "AWS-Load-Balancer-8-Draft"
index: 3810
subcategory: amazon-aws
date: 2019-09-16
tags: [VPC]
draft: true
---

> Amazon AWS Tutorial

## 8. HA Architecture
### 8.1 Load Balancers Theory
Load balancer types.
![image](/assets/images/note/9551/8-1-load-balancer-1.png)
Application load balancer.
![image](/assets/images/note/9551/8-1-load-balancer-2.png)
Network load balancer.
![image](/assets/images/note/9551/8-1-load-balancer-3.png)
Classic load balancer.
![image](/assets/images/note/9551/8-1-load-balancer-4.png)
![image](/assets/images/note/9551/8-1-load-balancer-5.png)
X-Forwarded-For-Header
![image](/assets/images/note/9551/8-1-load-balancer-6.png)
Exam tips.
![image](/assets/images/note/9551/8-1-load-balancer-exam-tips-1.png)
![image](/assets/images/note/9551/8-1-load-balancer-exam-tips-2.png)
![image](/assets/images/note/9551/8-1-load-balancer-exam-tips-3.png)
### 8.2 Load Balancers And Health Checks Lab
Reminder: Load Balancers are **not** free.

Diagram: Load Balancer & Health Check Architecture
![image](/assets/images/note/9551/8-2-load-balancer-architecture.png)

Lab1: Create two instances with show different web pages, then create classic load balancer.

1) Create first instance with the following bootstrap script, make it showing "This is WebServer 01" in the web page.
```raw
#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
cd /var/www/html
echo "<html><h1>This is WebServer 01</h1></html>" > index.html
```
Specify the subnet/AZ to 'eu-west-1a'.
![image](/assets/images/note/9551/8-2-classic-load-balancer-1.png)
2) Create second instance with the same bootstrap script, make it showing "This is WebServer 02" in the web page. Specify the subnet/AZ to 'eu-west-1b'. Now, we have two instances running in different AZs.
![image](/assets/images/note/9551/8-2-classic-load-balancer-2.png)
If we access the public id address, we will see the "This is WebServer 01" or "This is WebServer 02" respectively.
![image](/assets/images/note/9551/8-2-classic-load-balancer-3.png)
3) Create new classic load balancer. Services->EC2->Load Balancers, Create Load Balancer, provider name for it.
![image](/assets/images/note/9551/8-2-classic-load-balancer-4.png)
Choose the existing security group.
![image](/assets/images/note/9551/8-2-classic-load-balancer-5.png)
Configure health check.
![image](/assets/images/note/9551/8-2-classic-load-balancer-6.png)
Add two EC2 instances.
![image](/assets/images/note/9551/8-2-classic-load-balancer-7.png)
Keep tag empty and create. The load balancer is created, wait until the status is changed from "OutService" to "InService".
![image](/assets/images/note/9551/8-2-classic-load-balancer-8.png)
Copy the dns name and visit it in web browser.
![image](/assets/images/note/9551/8-2-classic-load-balancer-9.png)
We will see the content. Keep refreshing the page, sometimes we hit WebServer 1 and sometime we hit WebServer 2.
![image](/assets/images/note/9551/8-2-classic-load-balancer-10.png)
Stop the first instance which is Webserver 1.
![image](/assets/images/note/9551/8-2-classic-load-balancer-11.png)
The health check will notice this and the status of web server 1 instance is changed to "OutService".
![image](/assets/images/note/9551/8-2-classic-load-balancer-12.png)
If we refresh the page, we will only see webserver 2, as load balancer detects webserver 1 is not available, it is sending all traffic to web server 2.
![image](/assets/images/note/9551/8-2-classic-load-balancer-13.png)

Lab2: Create target group and application load balancer.

1) Create Target Group: Services->EC2->Target Groups, Create Target Group, provide the group name.
![image](/assets/images/note/9551/8-2-application-load-balancer-1.png)
Set path, threshold, timeout and interval.
![image](/assets/images/note/9551/8-2-application-load-balancer-2.png)
Once the group is created, switch to "Targets" tab, click "Edit" button.
![image](/assets/images/note/9551/8-2-application-load-balancer-3.png)
Add the two web server instances.
![image](/assets/images/note/9551/8-2-application-load-balancer-4.png)
2) Create new application load balancer. Services->EC2->Load Balancers, Create Load Balancer, select Application Load Balancer, provider name for it.
![image](/assets/images/note/9551/8-2-application-load-balancer-5.png)
Select all availability zones, next.
![image](/assets/images/note/9551/8-2-application-load-balancer-6.png)
Skip the warning, next.
![image](/assets/images/note/9551/8-2-application-load-balancer-7.png)
Select the WebDMZ security group, next.
![image](/assets/images/note/9551/8-2-application-load-balancer-8.png)
Select the existing group created in previous lab, next.
![image](/assets/images/note/9551/8-2-application-load-balancer-9.png)
Leave as it is.
![image](/assets/images/note/9551/8-2-application-load-balancer-10.png)
Go back the target group, click Edit.
![image](/assets/images/note/9551/8-2-application-load-balancer-11.png)
Select the two instances and click 'Add to registered'.
![image](/assets/images/note/9551/8-2-application-load-balancer-12.png)
Wait for a while, until the status become 'healthy'.
![image](/assets/images/note/9551/8-2-application-load-balancer-13.png)
Go to the load balancer, copy the dns name, visit it in the web browser.
![image](/assets/images/note/9551/8-2-application-load-balancer-14.png)
We will see the content. Keep refreshing the page, sometimes we hit WebServer 1 and sometime we hit WebServer 2.
![image](/assets/images/note/9551/8-2-application-load-balancer-15.png)
Why application load balancer is more intelligent than classic load balancer? Check the listeners in the load balancer, click on the listener.
![image](/assets/images/note/9551/8-2-application-load-balancer-21.png)
You can create rules with conditions and corresponding actions.
![image](/assets/images/note/9551/8-2-application-load-balancer-22.png)
![image](/assets/images/note/9551/8-2-application-load-balancer-23.png)
Exam tips.
![image](/assets/images/note/9551/8-2-load-balancer-exam-tips-1.png)
![image](/assets/images/note/9551/8-2-load-balancer-exam-tips-2.png)
![image](/assets/images/note/9551/8-2-load-balancer-exam-tips-3.png)
![image](/assets/images/note/9551/8-2-load-balancer-exam-tips-4.png)
### 8.3 Advanced Load Balancer Theory
Sticky sessions.
![image](/assets/images/note/9551/8-3-advanced-load-balancer-1.png)
![image](/assets/images/note/9551/8-3-advanced-load-balancer-2.png)
No Cross Zone load Balancing.
![image](/assets/images/note/9551/8-3-advanced-load-balancer-3.png)
With Cross Zone load Balancing.
![image](/assets/images/note/9551/8-3-advanced-load-balancer-4.png)
![image](/assets/images/note/9551/8-3-advanced-load-balancer-5.png)
Path Patterns.
![image](/assets/images/note/9551/8-3-advanced-load-balancer-6.png)
![image](/assets/images/note/9551/8-3-advanced-load-balancer-7.png)
Exam tips.
![image](/assets/images/note/9551/8-3-advanced-load-balancer-exam-tips.png)
### 8.4 Autoscaling Groups Lab
Create autoscaling group with 3 instances. Create 3 instances and terminate two, after a while, new two instances will be launched automatically.

Create Launch Configuration: Services->EC2->Auto Scaling->Launch Configurations, Create launch configuration.
![image](/assets/images/note/9551/8-4-autoscaling-groups-1.png)
Select the first AMI.
![image](/assets/images/note/9551/8-4-autoscaling-groups-2.png)
Select the free tier one.
![image](/assets/images/note/9551/8-4-autoscaling-groups-3.png)
Set name and put the bootstrap script.
```raw
#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
cd /var/www/html
echo "<html><h1>Welcome to the EC2 Fleet!</h1></html>" > index.html
```
![image](/assets/images/note/9551/8-4-autoscaling-groups-4.png)
Leave unchanged for the storage.
![image](/assets/images/note/9551/8-4-autoscaling-groups-5.png)
Select the WebDMZ security group, next.
![image](/assets/images/note/9551/8-4-autoscaling-groups-6.png)
Click "Create an AutoScaling Group using this launch configuration".
![image](/assets/images/note/9551/8-4-autoscaling-groups-7.png)
Set the group size=3.
![image](/assets/images/note/9551/8-4-autoscaling-groups-8.png)
Set the scale group size.
![image](/assets/images/note/9551/8-4-autoscaling-groups-9.png)
Skip the notification.
![image](/assets/images/note/9551/8-4-autoscaling-groups-10.png)
Set instance tag.
![image](/assets/images/note/9551/8-4-autoscaling-groups-11.png)
The AutoScaling group is created. Three instances are under this group.
![image](/assets/images/note/9551/8-4-autoscaling-groups-12.png)
Go to EC2 instance, we see all instances are up.
![image](/assets/images/note/9551/8-4-autoscaling-groups-13.png)
Terminate two of them.
![image](/assets/images/note/9551/8-4-autoscaling-groups-14.png)
In the Activity history of the AutoScaling group, we can see it detects the termination and launch new instances automatically.
![image](/assets/images/note/9551/8-4-autoscaling-groups-15.png)
After a while, new instances are launched.
![image](/assets/images/note/9551/8-4-autoscaling-groups-16.png)
### 8.5 HA Architecture
![image](/assets/images/note/9551/8-5-ha-architecture-1.png)
![image](/assets/images/note/9551/8-5-ha-architecture-2.png)
* [The Netflix Simian Army](https://medium.com/netflix-techblog/the-netflix-simian-army-16e57fbab116)

![image](/assets/images/note/9551/8-5-ha-architecture-3.png)
![image](/assets/images/note/9551/8-5-ha-architecture-4.png)
![image](/assets/images/note/9551/8-5-ha-architecture-5.png)
### 8.6 HA Word Press Site
The architecture of the wordpress website.
![image](/assets/images/note/9551/8-6-wordpress-1.png)
1) Create two S3 buckets, one for storing codes, another for media files.
![image](/assets/images/note/9551/8-6-wordpress-2.png)
2) Create distribution: Services->Networking & Content Delivery->CloudFront, Create Distribution.
![image](/assets/images/note/9551/8-6-wordpress-3.png)
Choose the **media** bucket for the Origin Domain Name, leave others as default.
![image](/assets/images/note/9551/8-6-wordpress-4.png)
The distribution is created and it takes some time to be ready.
![image](/assets/images/note/9551/8-6-wordpress-5.png)
3) Security Group  
Make sure the WebDMZ group has port 80 opened for all incoming requests.
![image](/assets/images/note/9551/8-6-wordpress-6.png)
And make sure rds group has opened mysql database port to WebDMZ group.
![image](/assets/images/note/9551/8-6-wordpress-7.png)
4) Create MySQL database, Services->RDS->Create Database, choose 'Dev/Test'.  
![image](/assets/images/note/9551/8-6-wordpress-8.png)
Specify db identifier, db name and password.
![image](/assets/images/note/9551/8-6-wordpress-9.png)
Select 't2.micro' for DB instance class, set storage size to 1000GB.
![image](/assets/images/note/9551/8-6-wordpress-10.png)
Enable Multi-AZ.
![image](/assets/images/note/9551/8-6-wordpress-11.png)
Expand 'Additional connectivity configuration', choose the 'rds-launch-wizard' as the security group.
![image](/assets/images/note/9551/8-6-wordpress-12.png)
Specify the initial database name, so that a new database will be created once the rds instance is launched.
![image](/assets/images/note/9551/8-6-wordpress-13.png)
MySQL instance is created.
![image](/assets/images/note/9551/8-6-wordpress-14.png)
5) Create new Role, Services->IAM->Roles->Create Role, choose EC2.
![image](/assets/images/note/9551/8-6-wordpress-15.png)
Search 's3', choose 'AmazonS3FullAccess'.
![image](/assets/images/note/9551/8-6-wordpress-16.png)
Skip the tag, provide the name for the new role.
![image](/assets/images/note/9551/8-6-wordpress-17.png)
6) Create EC2 instance.  
In 'Configure Instance' step, leave others unchanged, just change the role with the one we just created, S3ForWP. And paste the bootstrap script to user data.
```raw
#!/bin/bash
yum update -y
yum install httpd php php-mysql -y
cd /var/www/html
echo "healthy" > healthy.html
wget https://wordpress.org/wordpress-5.1.1.tar.gz
tar -xzf wordpress-5.1.1.tar.gz
cp -r wordpress/* /var/www/html/
rm -rf wordpress
rm -rf wordpress-5.1.1.tar.gz
chmod -R 755 wp-content
chown -R apache:apache wp-content
wget https://s3.amazonaws.com/bucketforwordpresslab-donotdelete/htaccess.txt
mv htaccess.txt .htaccess
chkconfig httpd on
service httpd start
```
![image](/assets/images/note/9551/8-6-wordpress-18.png)
Set Tag.
![image](/assets/images/note/9551/8-6-wordpress-19.png)
Select the WebDMZ security group, launch instance.
![image](/assets/images/note/9551/8-6-wordpress-20.png)
Lab problem.
![image](/assets/images/note/9551/8-6-wordpress-lab-problem.png)
### 8.7 Setting Up EC2
1) Preparation:  
Check that FrontCloud Distribution created in previous lab is enabled and deployed.
![image](/assets/images/note/9551/8-7-wordpress-1.png)
The RDS(MySQL) is also available.
![image](/assets/images/note/9551/8-7-wordpress-2.png)
EC2 Instance is up now, copy the public ip address.
![image](/assets/images/note/9551/8-7-wordpress-3.png)
ssh to the web server instance, navigate to /var/www/html directory, check if all wp files are there.
![image](/assets/images/note/9551/8-7-wordpress-4.png)
Also check if htaccess is configured.
```raw
cat .htaccess
```
![image](/assets/images/note/9551/8-7-wordpress-5.png)
2) Launch WordPress and create a new post with images.  
Start the apache server and visit the ip address in web browser, wordpress is started.
![image](/assets/images/note/9551/8-7-wordpress-6.png)
Setup wordpress, the database host is the endpoint of the MySQL instance.
![image](/assets/images/note/9551/8-7-wordpress-7.png)
Error occurs: can’t write the wp-config.php file.
![image](/assets/images/note/9551/8-7-wordpress-8.png)
Copy the script, then ssh to the web server. Create a file named wp-config.php in folder /var/www/html with the script. Refresh the page, you should see the wordpress configuration page successfully. Put the required information here, click "Install WordPress".
![image](/assets/images/note/9551/8-7-wordpress-9.png)
WordPress is installed successfully.
![image](/assets/images/note/9551/8-7-wordpress-10.png)
Login with acloudgur/acloudguru.
![image](/assets/images/note/9551/8-7-wordpress-11.png)
Home page of WordPress.
![image](/assets/images/note/9551/8-7-wordpress-12.png)
Create a new post with two images.
![image](/assets/images/note/9551/8-7-wordpress-13.png)
Click publish, new the post is published and we are able to view it.
![image](/assets/images/note/9551/8-7-wordpress-14.png)
In the web server, we will see the upload folder with two image files.
![image](/assets/images/note/9551/8-7-wordpress-15.png)
3) Next, we want each time user uploads the images, they can be replicated to S3 automatically.

Use `aws s3 ls` to show the existing buckets in s3. Use `aws s3 cp` command to copy files from web server to s3 **media** buckets.
![image](/assets/images/note/9551/8-7-wordpress-16.png)
Moreover, use `aws s3 cp` to copy the entire wordpress files into s3 **code** bucket.
![image](/assets/images/note/9551/8-7-wordpress-17.png)
Use `aws s3 ls` to check all files are copied to s3 bucket.
![image](/assets/images/note/9551/8-7-wordpress-18.png)
4) Setup redirect, whenever user accesses the post, all the image requests will be redirected to s3.  
Get the domain name of the cloudfront distribution.
![image](/assets/images/note/9551/8-7-wordpress-19.png)
Edit the '.htaccess' file.
![image](/assets/images/note/9551/8-7-wordpress-20.png)
Update the `rewriterrule` with the domain name of cloudfront distribution, which is pointing to s3.
![image](/assets/images/note/9551/8-7-wordpress-21.png)
Use `aws s3 sync` to sync the changed files from web server to s3 buckets. This time, only the '.htaccess' file is synced.
![image](/assets/images/note/9551/8-7-wordpress-22.png)
Edit file `/etc/httpd/conf/httpd.conf`.
![image](/assets/images/note/9551/8-7-wordpress-23.png)
Change the value of `AllowOverride` from None to All.
![image](/assets/images/note/9551/8-7-wordpress-24.png)
Run `service httpd restart` to restart apache.
5) Update bucket policy for **media** bucket.  
Paste the following script into Bucket Policy, replace the arn.
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
        ],
      "Resource": [
        "arn:aws:s3:::BUCKET_NAME/*"
        ]
    }
  ]
}
```
![image](/assets/images/note/9551/8-7-wordpress-25.png)
After clicking "Save" button, both permission and bucket policy are marked as public.
![image](/assets/images/note/9551/8-7-wordpress-26.png)
If you encounter any error, select the s3 bucket, click "Edit public access settings".
![image](/assets/images/note/9551/8-7-wordpress-27.png)
Make sure none of the options are checked, and save.
![image](/assets/images/note/9551/8-7-wordpress-28.png)
Wait for a while, revisit the post, the image should be fetched from the cloudfront, which is pointing to s3 media bucket.
![image](/assets/images/note/9551/8-7-wordpress-29.png)
5) Create new application load balancer.  
Put the name.
![image](/assets/images/note/9551/8-7-wordpress-30.png)
Select all available AZs.
![image](/assets/images/note/9551/8-7-wordpress-31.png)
Select the WebDMZ security group.
![image](/assets/images/note/9551/8-7-wordpress-32.png)
Create a new target group, set path to healthy.html.
![image](/assets/images/note/9551/8-7-wordpress-33.png)
Choose the instance, then create.
![image](/assets/images/note/9551/8-7-wordpress-34.png)
Load balancer is created, wait for few minutes, the status is changed to 'active'.
![image](/assets/images/note/9551/8-7-wordpress-35.png)
6) Optional step, domain name, Services->Route 53->Hosted Zone.
![image](/assets/images/note/9551/8-7-wordpress-36.png)
Select the existing domain, click 'Create Record Sets'.
![image](/assets/images/note/9551/8-7-wordpress-37.png)
Choose 'Alias'=Yes, Alias Target = application load balancer.
![image](/assets/images/note/9551/8-7-wordpress-38.png)
Now the dns is pointing to the load balancer.
![image](/assets/images/note/9551/8-7-wordpress-39.png)
7) Target Group. Add instance into target group.

Services->EC2->Target Group, select the target group, click Edit button in Targets tab.
![image](/assets/images/note/9551/8-7-wordpress-40.png)
Select the instance and click 'Add to registered'.
![image](/assets/images/note/9551/8-7-wordpress-41.png)
Wait for a while, the status becomes healthy.
![image](/assets/images/note/9551/8-7-wordpress-42.png)
Visit the domain, we should see the post.
![image](/assets/images/note/9551/8-7-wordpress-43.png)
### 8.8 Adding Resilience And Autoscaling
![image](/assets/images/note/9551/8-8-resilience-autoscaling-1.png)
Lab: The left node will be used for writing only and all the read request will be sent to the right node, which is a replica of the left.

1) Automate files synchronization from web server to s3 bucket.  
Create file named `crontab` in `/etc` directory.
```raw
cd /etc
nano crontab
```
Put the following content into it. The sync happens in every minute.
```raw
*/1 * * * * root aws s3 sync --delete s3://acloudguruwp-code-rjk19 /var/www/html
```
![image](/assets/images/note/9551/8-8-resilience-autoscaling-2.png)

Run following command to start the `cront` service.
```raw
service cront restart
```
![image](/assets/images/note/9551/8-8-resilience-autoscaling-3.png)
Test this by uploading a file into the **code** bucket.
![image](/assets/images/note/9551/8-8-resilience-autoscaling-4.png)
Restart the cront service, find the file in /etc/www/html directory.
![image](/assets/images/note/9551/8-8-resilience-autoscaling-5.png)
2) Setup the read replica and put it behind the load balancer.  
Select the WordPress EC2 instance, Actions->Image->Create Image.
![image](/assets/images/note/9551/8-8-read-replica-1.png)
Set the name and description, create image.
![image](/assets/images/note/9551/8-8-read-replica-2.png)
The EC2 instance will reboot and an AMI is create.
![image](/assets/images/note/9551/8-8-read-replica-3.png)

3) Update crontab configuration in the first WP instance, which will be used as write node.
```raw
*/1 * * * * root aws s3 sync --delete /var/www/html s3://acloudguruwp-code-rjk19
*/1 * * * * root aws s3 sync --delete /var/www/html/wp-content/uploads/ s3://acloudguruwp-media-rjk19
```
* Be aware of that this web server a writing node.
* The first rule: sync all files from write instance to **code** bucket.
* The second rule: sync all uploaded images from write instance to **media** bucket.

![image](/assets/images/note/9551/8-8-read-replica-4.png)
Testing the settings. Create a file named test.txt in the /var/www/html directory and restart the cront service.
![image](/assets/images/note/9551/8-8-read-replica-5.png)
Go to the s3 **code** bucket, test.txt is there. You may not be able to see it immediately due to the eventual consistency.
![image](/assets/images/note/9551/8-8-read-replica-6.png)
4) Launch new instance for read node.  
Create auto scaling group, Services->EC2->Auto Scaling Group.
![image](/assets/images/note/9551/8-8-launch-read-replica-1.png)
Select the option 'Create a new launch configuration'.
![image](/assets/images/note/9551/8-8-launch-read-replica-2.png)
Select the own AMI image.
![image](/assets/images/note/9551/8-8-launch-read-replica-3.png)

Set name, choose IAM role and put the bootstrap script into user data.
```raw
#!/bin/bash
yum update -y
aws s3 sync --delete s3://YOUR_S3_BUCKET_NAME /var/www/html
```
![image](/assets/images/note/9551/8-8-launch-read-replica-4.png)
Keep the default values for storage.
![image](/assets/images/note/9551/8-8-launch-read-replica-5.png)
Select the WebDMZ security group.
![image](/assets/images/note/9551/8-8-launch-read-replica-6.png)
After clicking the launch instance, you will see the 'configure autoscaling group' page. Set name, select all available AZs.
![image](/assets/images/note/9551/8-8-launch-read-replica-7.png)
Choose the Target Group and set the grace period to 60 seconds, next.
![image](/assets/images/note/9551/8-8-launch-read-replica-8.png)
Leave as it is.
![image](/assets/images/note/9551/8-8-launch-read-replica-9.png)
Skip the notification, set instance tag.
![image](/assets/images/note/9551/8-8-launch-read-replica-10.png)
Review, create auto scaling group.
![image](/assets/images/note/9551/8-8-launch-read-replica-11.png)
5) Remove the write node from the target group. Select the target group, click edit button.
![image](/assets/images/note/9551/8-8-launch-read-replica-12.png)
Select the instance, click remove button.
![image](/assets/images/note/9551/8-8-launch-read-replica-13.png)
Now we see the two read nodes.
![image](/assets/images/note/9551/8-8-launch-read-replica-14.png)
Rename the write node to MyWP-WN to make more clear.
![image](/assets/images/note/9551/8-8-launch-read-replica-15.png)
Check the target group, both two read nodes are healthy.
![image](/assets/images/note/9551/8-8-launch-read-replica-16.png)
6) Testing  
Visit the site with the domain name, it should return the images from s3 bucket.
![image](/assets/images/note/9551/8-8-read-replica-testing-1.png)
Visit the admin page of wordpress, http://domain/wp-admin/, input user name and password.
![image](/assets/images/note/9551/8-8-read-replica-testing-2.png)
Now we are in the admin page. Notice that the domain is an ip address, which is write's node public ip.
![image](/assets/images/note/9551/8-8-read-replica-testing-3.png)
Create a new post with uploading a picture.
![image](/assets/images/note/9551/8-8-read-replica-testing-4.png)
The image is not showing properly. This is because the image is not propagated from s3 bucket yet.
![image](/assets/images/note/9551/8-8-read-replica-testing-5.png)
Publish the post and wait for few minutes. Refresh the page, we should be able to see the image.
![image](/assets/images/note/9551/8-8-read-replica-testing-6.png)
If we visit the frontend, we should see the new post with image propagated properly.
![image](/assets/images/note/9551/8-8-read-replica-testing-7.png)
If we copy the image url and view it in browser, we should see it is from the cloudfront, from s3 bucket.
![image](/assets/images/note/9551/8-8-read-replica-testing-8.png)
7) Test High Availability.  
Terminate one of the read node.
![image](/assets/images/note/9551/8-8-testing-availability-1.png)
Check the target group, there is only one healthy instance. If we visit the site, it is still responsive, though there may be some latency.
![image](/assets/images/note/9551/8-8-testing-availability-2.png)
Check the auto scaling group, check the history, it detects the unhealthy occurrence.
![image](/assets/images/note/9551/8-8-testing-availability-3.png)
New instance will be launched automatically.
![image](/assets/images/note/9551/8-8-testing-availability-4.png)
Check the target group, wait until the healthy node comes back. Again, we have to healthy read nodes.
![image](/assets/images/note/9551/8-8-testing-availability-5.png)
Refresh the site, it is still running properly. We have auto healing system!
![image](/assets/images/note/9551/8-8-testing-availability-6.png)

### 8.9 Cleaning Up
Lab: RDS failover, High availability of database.  

Reboot the database.
![image](/assets/images/note/9551/8-9-rds-failover-1.png)
Select the "Reboot With Failover" option. The database will be failed over from one availability zone to another.
![image](/assets/images/note/9551/8-9-rds-failover-2.png)
The database will be rebooted.
![image](/assets/images/note/9551/8-9-rds-failover-3.png)
The website will not be accessible, 504 error is returned.
![image](/assets/images/note/9551/8-9-rds-failover-4.png)
Once the database comes back, our site will work again.
![image](/assets/images/note/9551/8-9-rds-failover-5.png)
![image](/assets/images/note/9551/8-9-rds-failover-6.png)
Delete all assets, instance, database, buckets, etc for clean up.
### 8.10 CloudFormation
Create cloudformation, Services->Management & Governance->CloudFormation, create stack.
![image](/assets/images/note/9551/8-10-cloudformation-1.png)
Choose 'Use a sample template' option, and select WordPress blog template.
![image](/assets/images/note/9551/8-10-cloudformation-2.png)
Set name and database parameters.
![image](/assets/images/note/9551/8-10-cloudformation-3.png)
Add tag, next, review and create.
![image](/assets/images/note/9551/8-10-cloudformation-4.png)
It is created.
![image](/assets/images/note/9551/8-10-cloudformation-5.png)
Wait for a while, the creation is completed. We see some web servers and security groups are created.
![image](/assets/images/note/9551/8-10-cloudformation-6.png)
Switch to the Outputs tab, hit the link.
![image](/assets/images/note/9551/8-10-cloudformation-7.png)
We should see the word press configuration page. WordPress site is ready to use.
![image](/assets/images/note/9551/8-10-cloudformation-8.png)
Switch to Resources tab. Notice that only web server and security group are created. There is no RDS is created. You can confirm this by going to RDS to see if there is any new instance is launched.
![image](/assets/images/note/9551/8-10-cloudformation-9.png)
Only one EC2 instance we can find.
![image](/assets/images/note/9551/8-10-cloudformation-10.png)
* Visit https://aws.amazon.com/quickstart/?quick to see available templates.

Exam tips.
![image](/assets/images/note/9551/8-10-cloudformation-exam-tips.png)
### 8.11 Elastic Beanstalk
Create Elastic Beanstalk, Services->Compute->Elastic Beanstalk.
![image](/assets/images/note/9551/8-11-elastic-beanstalk-1.png)
![image](/assets/images/note/9551/8-11-elastic-beanstalk-2.png)
![image](/assets/images/note/9551/8-11-elastic-beanstalk-3.png)
![image](/assets/images/note/9551/8-11-elastic-beanstalk-4.png)
![image](/assets/images/note/9551/8-11-elastic-beanstalk-5.png)
![image](/assets/images/note/9551/8-11-elastic-beanstalk-6.png)
Instance is auto generated.
![image](/assets/images/note/9551/8-11-elastic-beanstalk-7.png)
Test the web page.
![image](/assets/images/note/9551/8-11-elastic-beanstalk-8.png)
Exam tips.
![image](/assets/images/note/9551/8-11-elastic-beanstalk-exam-tips.png)
### 8.12 HA Summary
![image](/assets/images/note/9551/8-12-ha-summary-1.png)
![image](/assets/images/note/9551/8-12-ha-summary-2.png)
![image](/assets/images/note/9551/8-12-ha-summary-3.png)
![image](/assets/images/note/9551/8-12-ha-summary-4.png)
![image](/assets/images/note/9551/8-12-ha-summary-5.png)
![image](/assets/images/note/9551/8-12-ha-summary-6.png)
![image](/assets/images/note/9551/8-12-ha-summary-7.png)
### 8.13 HA Architecture Quiz
![image](/assets/images/note/9551/8-13-ha-quiz-1.png)
![image](/assets/images/note/9551/8-13-ha-quiz-2.png)
![image](/assets/images/note/9551/8-13-ha-quiz-3.png)
![image](/assets/images/note/9551/8-13-ha-quiz-4.png)
![image](/assets/images/note/9551/8-13-ha-quiz-5.png)
![image](/assets/images/note/9551/8-13-ha-quiz-6.png)
![image](/assets/images/note/9551/8-13-ha-quiz-7.png)
![image](/assets/images/note/9551/8-13-ha-quiz-8.png)
![image](/assets/images/note/9551/8-13-ha-quiz-9.png)
![image](/assets/images/note/9551/8-13-ha-quiz-10.png)
![image](/assets/images/note/9551/8-13-ha-quiz-11.png)
![image](/assets/images/note/9551/8-13-ha-quiz-12.png)
![image](/assets/images/note/9551/8-13-ha-quiz-13.png)
![image](/assets/images/note/9551/8-13-ha-quiz-14.png)
![image](/assets/images/note/9551/8-13-ha-quiz-15.png)
![image](/assets/images/note/9551/8-13-ha-quiz-16.png)



## 9. References
