---
layout: tutorial
key: tutorial
title: "Setting up Android Development Environment on Mac"
index: 2321
category: mobile
breadcrumb: [Tutorial, Frontend, Mobile]
image: mobiledev.png
date: 2017-07-13
tags: [Android Studio, Genymotion, JDK]
---

> Introduce how to setup Android development environment on Mac.

## 1. Development of Android
In order to develop Android applications, you must have the following software installed on your system:
* Java Development Kit (JDK)
* Android Studio
* Genymotion(Emulator, it is optional)

## 2. Installing JDK on Mac
### 2.1 Downloading Oracle JDK
Download the latest version of JDK from [http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html). Select JDK, in the next page, accept the license and choose 'jdk-8u151-macosx-x64.dmg' to download.
### 2.2 Installing JDK
After downloading finish, double click on the installer. Follow the wizard to install JDK.
![image](/public/images/frontend/2321/jdkinstall.png){:width="600px"}  
Finally, JDK is installed to /Library/Java/JavaVirtualMachines/jdk1.8.0_151.jdk/.
### 2.3 Checking Java Version
```sh
$ java -version
```
You should be able to see the java information like below.
```sh
java version "1.8.0_151"
Java(TM) SE Runtime Environment (build 1.8.0_151-b12)
Java HotSpot(TM) 64-Bit Server VM (build 25.151-b12, mixed mode)
```

## 3. Installing Android Studio
### 3.1 Downloading Android Studio for Mac
Go to https://developer.android.com/studio/index.html, download Android Studio for Mac, eg. 'android-studio-ide-171.4408382-mac.dmg'.
### 3.2 Installing Android Studio
The installation is very simple. Just double-click on the installer file, and drag Android Studio to Applications folder.
![image](/public/images/frontend/2321/androidstudioinstall.png){:width="600px"}  
### 3.3 Configuration of Android Studio
The first time when Android Studio is launched, you need to follow the setup wizard to download components for Android Studio.
![image](/public/images/frontend/2321/setupwizard.png){:width="800px"}  
Choose 'Standard' for install type.
![image](/public/images/frontend/2321/setupinstalltype.png){:width="800px"}  
Select the 'Default' theme.
![image](/public/images/frontend/2321/setuptheme.png){:width="800px"}  
Confirm the settings.
![image](/public/images/frontend/2321/setupverify.png){:width="800px"}  
Click 'Finish' to start downloading the components.
![image](/public/images/frontend/2321/setupdownload.png){:width="800px"}  
It takes few minutes to finish.
![image](/public/images/frontend/2321/setupfinish.png){:width="800px"}  
### 3.4 Launching Android Studio
In the welcome window, choose to create a new project or open an existing project.
![image](/public/images/frontend/2321/androidstudiolaunch.png){:width="700px"}  
Here, I open one existing Android project on my Mac.
![image](/public/images/frontend/2321/androidstudioide.png)
## 4. Installing Android SDK and Tools
In Android Studio, Tools -> Android -> SDK Manager. Select the SDKs and Tools you want to install, click 'OK' and confirm.
![image](/public/images/frontend/2321/sdkmanager.png){:width="800px"}  
![image](/public/images/frontend/2321/sdktools.png){:width="800px"}  
Accept the license agreement and click 'Next'.
![image](/public/images/frontend/2321/sdklicense.png){:width="700px"}  
SDK Manager starts to download and install components.
![image](/public/images/frontend/2321/sdkinstalling.png){:width="700px"}  

## 5. Creating Virtual Devices
In Android Studio, Tools -> Android -> AVD Manager. Click 'Create Virtual Device' button.
![image](/public/images/frontend/2321/avdmanager.png)  
Select 'Phone' and 'Nexus 5X', Next.
![image](/public/images/frontend/2321/avdhardware.png)  
Click 'Download' of 'API 27'.
![image](/public/images/frontend/2321/avdimage.png)  
Accept the license agreement.
![image](/public/images/frontend/2321/avdlicense.png){:width="700px"}  
Start to download the image.
![image](/public/images/frontend/2321/avddownloading.png){:width="700px"}  
Image is downloaded, click 'Next'.
![image](/public/images/frontend/2321/avdimagedownloaded.png)  
Confirm the AVD.
![image](/public/images/frontend/2321/avdfinish.png)  
The new virtual device is now in AVD Manger.
![image](/public/images/frontend/2321/avdmanagernewdevice.png)  
In Android Studio, start running app through menu Run -> Run 'app'. Choose the virtual device 'Nexus 5X API27' we just created.
![image](/public/images/frontend/2321/avdrun.png){:width="600px"}  
The Android app is running in the emulator.
![image](/public/images/frontend/2321/avdemulator.png){:width="500px"}  

## 6. Installing Genymotion
### 6.1 Creating Genymotion Account
Go to https://www.genymotion.com/account/create/, create an account on Genymotion.
### 6.2 Downloading and Installing Genymotion
Go to https://www.genymotion.com/download/, download Genymotion for Mac, eg. 'genymotion-2.11.0.dmg'. Double click on the installer file, and move Genymotion and Genymotion Shell to Applications folder.
![image](/public/images/frontend/2321/genymotioninstall.png){:width="600px"}  
### 6.3 Launching Genymotion
Login with the account created in previous step, select `free personal use` license.
### 6.4 Adding Virtual Device
Click 'Add' button, choose `Google Nexus 5X` as device model, and select the proper API version.
![image](/public/images/frontend/2321/genymotionnexus5x.png){:width="650px"}  
Click Next to confirm the device settings.
![image](/public/images/frontend/2321/genymotionconfirm.png){:width="800px"}  
Create another virtual device for `Google Nexus 9`.
![image](/public/images/frontend/2321/genymotionnexus9.png){:width="650px"}  
Click Next to confirm the device settings.
![image](/public/images/frontend/2321/genymotionconfirm2.png){:width="800px"}  
Now, we have two virtual devices, one is for phone, another is for pad.
![image](/public/images/frontend/2321/genymotiondevices.png){:width="650px"}  
### 6.5 Starting Virtual Device
Click the Start button to launch the virtual device. It's running now.
![image](/public/images/frontend/2321/genymotionrunning.png){:width="400px"}  
### 6.6 Choosing Genymotion Virtual Device in Android Studio
In Android, run the app. We can now select the virtual device created by Genymotion.
![image](/public/images/frontend/2321/genymotionemulator.png){:width="600px"}  
Click OK. App from Android Studio is deployed to Genymotion virtual devices. You can start testing now.
![image](/public/images/frontend/2321/genymotionapp.png){:width="400px"}  

## 7. References
* [Install Android Studio](https://developer.android.com/studio/install.html)
* [Set Up Your Android Development Environment](https://trailhead.salesforce.com/en/projects/mobilesdk_setup_dev_tools/steps/mobilesdk_setup_android)
