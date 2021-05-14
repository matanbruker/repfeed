# RepFeed

RepFeed is a project of Node.js and JavaScript + Vue.js which presents an interface that allows the user to control the political tweets to which he wants to be exposed and allows the user to see tweets of a particular population segment by selecting filters.<br>

The information displayed in the project is retrieved using SQL queries and verified by the Twitter API.
<br>
<br>

## Downlaod Feature

RepFeed system provides political tweets from several points of view that exist in the society.
<br>
<br>
**The system is already available for download in the Google Chrome Web Store. 
<br>
For download please click on the following link:** [RepFeed Feature](https://chrome.google.com/webstore/detail/repfeed/mmicoheejekjeagfokgpdplnhfaibkej?hl=en-US)
<br>
<br>
For adding the extension to the browser, click the on the blue button that says: Add to Chrome.
<br>
<br>

## Start Work With RepFeed!
After the installation, please make sure that the extension is active. If not, you may click on the extension's icon for make it active. 
<br>
Now, you may visit twitter website. You may click on the following link:  [Twitter](https://twitter.com/home)

<br>

## What Can You Do With The RepFeed Feature?
You could notice that on the left side of the page, in the navigation bar, 2 new tabs where added:
<br>
### RepFeed
After clicking the RepFeed button, it will direct to a new page.
<br>
The page contains a bar with values raging from -1 to 1. The values represent political classification values from Democrat up to Republican.
<br>
You may move the bar's pointer between these values and the system will present tweets of the chosen value. 
<br>
<br>
### Population
After clicking the population button, it will direct to new page. The page contains 5 different filters.
<br>
You may choose any combination of the filters below:
<br>
-	Age – present options of age ranges. 
-	State – present options of the states in the US.
-	Gender – present options of the 2 genders.
-	Party – present options of the parties that exist in USA.
-	Race – present option of the existing races in the US.
<br>
For example, if you use the "Party" filter and choose "Democrat", the system will show you tweets by the point of view of Democrats.
<br>
You may choose multiple number of filters.

<br>


## System Structure  
### Server side
The server functions as an external API that could receive HTTP requests,
<br>
and by the request's kind it will direct to the relevant JS code, operate the relevant functions and get the required data from the Data Base.
<br>
In addition, the server side contains Python code that run consistently and by using Twitter API, it receives updated political tweets of the panel members in the Data Base.
<br>
The Data Base was built Using Microsoft SQL server.


### Front side
The front side contains 2 systems:
<br>
-	Beta system which was used in the user's experiment. This system is separated from Twitter and open a new tab in the browser. We used Vue.js.
-	Chrome extension which combines the system with twitter website. It adds the tabs above the navigation bar in twitter. 

<br>

## Creators

Aviran Goel, Doron Shamai, Itay Merhav, Matan Bruker


**Under the guidance of Dr. Nir Grinberg**
