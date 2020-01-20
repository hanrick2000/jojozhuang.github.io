---
layout: tutorial
key: popular
title: "Jekyll - Social Share Buttons with ShareThis"
index: 1618
subcategory: jekyll
date: 2017-08-20
tags: [ShareThis]
---

> Integrate ShareThis to Jekyll website.

## 1. ShareThis
The [ShareThis](https://www.sharethis.com/) button is an all-in-one widget that lets people share any content on the web with friends via e-mail, AIM, or text message.

## 2. Creating Share Buttons
### 2.1 Registration
Go to https://www.sharethis.com/ to create a new account.
### 2.2 Choose Button Type
ShareThis provides two types of share button, inline buttons and sticky buttons. I choose sticky button for this tutorial.
![image](/assets/images/jekyll/1618/buttontype.png)
### 2.3 Button Design
You can design the share buttons. Add or remove buttons based on your needs. Set the alignment, button labels, counts, etc.
![image](/assets/images/jekyll/1618/buttondesign.png)
### 2.4 Scripts
You will get the scripts.
![image](/assets/images/jekyll/1618/scripts.png)
Copy and add the scripts into `_layouts/default.html`.
```html
<script type='text/javascript' src='//platform-api.sharethis.com/js/sharethis.js#property=5b595ccbf5aa6d001130cf95&product=sticky-share-buttons' async='async'></script>
```

## 4. Wrapping Up
We see the share buttons below the pagination bar.
![image](/assets/images/jekyll/1618/desktop_home.png)
![image](/assets/images/jekyll/1618/desktop_tutorial.png)
![image](/assets/images/jekyll/1618/desktop_201.png)
Share to facebook.
![image](/assets/images/jekyll/1618/sharing_facebook.png)
Share to twitter.
![image](/assets/images/jekyll/1618/sharing_twitter.png)
Share to linkedin.
![image](/assets/images/jekyll/1618/sharing_linkedin.png)
Access the website from mobile device.
![image](/assets/images/jekyll/1618/mobile_home.png){:width="400px"}  
![image](/assets/images/jekyll/1618/mobile_tutorial.png){:width="400px"}  
![image](/assets/images/jekyll/1618/mobile_201.png){:width="400px"}  

## 5. Cross Domain
ShareThis supports multiple domains. You can create different share buttons for different domains. For different domains, you will get different urls for sharethis.js.
![image](/assets/images/jekyll/1618/multi-domain.png)

I deployed my personal website to two domains, https://jojozhuang.github.io/ and https://rongzhuang.me/. Both are generated based on the same codes, https://github.com/jojozhuang/jojozhuang.github.io.

We can use Jekyll Environment Variables to specify different urls for share buttons.

Edit `_layouts/default.html`, use `jekyll.environment` in the condition statement.
{% raw %}
```raw
{% if jekyll.environment == "production" %}
  <script type='text/javascript' src='https://platform-api.sharethis.com/js/sharethis.js#property=5e25e723d6ee4a00124a9181&product=sticky-share-buttons' async='async'></script>
{% else %}
  <script type='text/javascript' src='https://platform-api.sharethis.com/js/sharethis.js#property=5b595ccbf5aa6d001130cf95&product=sticky-share-buttons' async='async'></script>
{% endif %}
```
{% endraw %}

Edit `netlify.toml`, specify a production environment in the build command. Notice, https://rongzhuang.me/ is hosted on http://jojozhuang.netlify.com/, we reply on netlify to build this website. netlify.toml is the configuration file.
```toml
[build]
  command = "JEKYLL_ENV=production jekyll build"
  publish = "_site/"

...
```

## 6. References:
* [ShareThis - Getting Share Buttons](https://platform.sharethis.com/sticky-share-buttons)
* [Jekyll Environment Variables](https://jekyllrb.com/docs/configuration/environments/)
