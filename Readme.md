# transfer Kelio results from hours into days
This script updates the remaining vacation days in kelio from hours into days.  
It will also add up all remaining days and shows you the result.

This script will work on all pages of this url 
```
https://*.kelio.io/*
```

if you have a custom local URL then change this line with you local url
```
// @match          https://*.kelio.io/* 
```

## result
![before](https://github.com/NicoLouis-be/kelio-to-days/blob/main/images/before_inDays.png)
![after](https://github.com/NicoLouis-be/kelio-to-days/blob/main/images/after_inDays.png)

## How to use this
Add the script in the Tampermonkey or greasemonkey add-on, depending on the browser you are using.  

Check the externals setting if you want to make use of the auto-update feature  
![auto-update](https://github.com/NicoLouis-be/kelio-to-days/blob/main/images/AutoUpdate.png)  

you can remove these 2 lines if you explicitly don't want updates  
```
// @downloadURL    https://raw.githubusercontent.com/NicoLouis-be/kelio-to-days/main/kelio-to-days.js  
// @updateURL      https://raw.githubusercontent.com/NicoLouis-be/kelio-to-days/main/kelio-to-days.js  
```