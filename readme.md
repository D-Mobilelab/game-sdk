<h1>GamifiveSDK 2.x.x</h1>
<p>This is the how-to for game developers for integrating GamifiveSDK into their games.</p>

<b>Note:</b> the SDK was previously called GamefiveSDK, now it has been aliased as GamifiveSDK so both names can be used.
All the aliases:'GamefiveSDK', 'DocomoSDK', 'GamifiveSdk', 'GamefiveSdk'

## Develop - Debug Environment

The debug environment is a simple static server that serve the 'sample' folder.
To run the environment you need to have installed: 
1) git 2.x, (or you can download directly from github)
2) node v5.x, npm 3.x or superior

If you already have this on your machine go ahead. Otherwise go to section [Install NodeJS and NPM in your system](#install-nodejs-and-npm-in-your-system)

### Clone the repo.

```javascript
git clone git@github.com:D-Mobilelab/game-sdk.git
```

### Install npm dependencies

```javascript
cd game-sdk && npm install
```

### Debug (testing on local)

Copy your game in game-sdk/sample/game-folder/
and in your index.html paste this lines

```javascript
    <!-- CSS Needed if you want to see the gameover. not mandatory. Remember to remove it before sending us the package -->
    <link rel="stylesheet" href="http://s.motime.com/tbr/less.css?file=app-gameover.less&country=ww-appsworld&t=20170111153950" />
    <script src="http://static.newton.pm/js/v2.2.3/newton.min.js"></script>
    <!-- Don\'t worry will be there.-->
    <script type="text/javascript" src="../gfsdk.js"></script> 
```

### Run the server

```javascript
npm run dev
```

and go to <http://local.appsworld.gamifive-app.com:8080/webpack-dev-server/setup.html>
with your browser

### Set some variables

Here <http://local.appsworld.gamifive-app.com:8080/webpack-dev-server/setup.html>
you should see a page where you can set:

1.  game_id: 
    if you already have your game in our server you can put it here otherwise leave the default
2.  user_id: 
    if you already have a user_id our server you can put it here otherwise leave the default
3.  user_type: premium | guest (unlogged) | free (facebook)

Click on Set button and go to <http://local.appsworld.gamifive-app.com:8080/webpack-dev-server/game-folder/index.html>

# Sending the package

Before sending us the package remember to remove the debug lines and just leaves this
```javscript
<!-- CSS Needed if you want to see the gameover. not mandatory. Remember to remove it before sending us the package -->
<!-- link rel="stylesheet" href="http://s.motime.com/tbr/less.css?file=app-gameover.less&country=ww-appsworld&t=20170111153950" /-->
<!-- script src="http://static.newton.pm/js/v2.2.3/newton.min.js"></script -->
<script id="gfsdk" src="http://s.motime.com/js/wl/webstore_html5game/gfsdk/dist/gfsdk.min.js"></script>
```

# Install NodeJS and NPM in your system

-   Mac Users can follow this guide: <http://blog.teamtreehouse.com/install-node-js-npm-mac>
-   Windows Users can follow this one: <http://blog.teamtreehouse.com/install-node-js-npm-windows>
    (Some other of billions guides on the web anyway will be ok)

### Edit your hosts file

Add this line

```javascript
   127.0.0.1 local.appsworld.gamifive-app.com
```

into your hosts file

```javascript
/private/etc/hosts file (Mac)
C:\Windows\System32\drivers\etc\hosts (Windows)
```

On Mac you can simply append this line at the end of the file in this way:

```javascript
sudo -i # Enter the password
sudo echo '127.0.0.1 local.appsworld.gamifive-app.com' >> /private/etc/hosts;
exit
```

(Guide to edit hosts file on any platform <http://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/>)

## Initializing the SDK

The SDK can be initialized calling its <i>init</i> method with a <i>param</i> object as a configuration parameter. Here's a brief description of the accepted configuration variables:

<ul>
    <li>
        <i><b>lite</b></i> (boolean): toggles lite mode, if <i>true</i> a reduced set of functionalities is used, in particular the GameOver screen is not loaded. Lite mode is useful for integrating the SDK into level-based games, so that the game's flow won't get interrupted by the gameover screen. Normal (non-lite) mode, instead, is meant to be used for other kind of games, i.e. those that feature an endless gameplay experience;
    </li>
    <li> 
        !!DEPRECATED!!
        <i><b>moreGamesButtonStyle</b></i> (object): defines the css style of the "more games" button. If present, the button will be displayed (you can pass an empty object for using the default style).
    </li>
</ul>

### Example

```javascript
GamifiveSDK.init({ 
	lite: false	//With our gameover
});
```

The <i>GamifiveSDK.init</i> method will store the configuration parameters into the module and perform the operations needed for properly initializing the SDK (if you are not using the lite version). 

Please note that the <i>init</i> method will not create a new instance of <i>GamifiveSDK</i>, but it will just reset its configuration; in fact you can have only one instance of <i>GamifiveSDK</i> because it's implemented as a singleton. 

## 2) Starting a session

A session is a continued user activity like a game match. 
Ideally a session begins everytime the player starts playing a new game and his score is set to zero.

### Lite Mode

For starting a session  in lite mode you just have to call <i>GamifiveSDK.startSession()</i>.

### Normal (non-lite) Mode

For starting a session you have to:

<ol>
	<li>move the start of the game into <i>GamifiveSDK.onStartSession()</i> method</li>
	<li>call <i>GamifiveSDK.startSession()</i> method to start the game</li>
</ol>

Here's an example:

<b>Before, without GamifiveSDK</b>

```javascript
// your method to start a game match
function startMatch(){ /* ... */ }
```

```html
<!-- button to start a game match -->
<button onclick="startMatch()">START MATCH</button>
```

<b>After, with GamifiveSDK</b>

```javascript
// your method to start a game match 
// (don't change it)
function startMatch(){ /* ... */ }

// onStartSession include startMatch() method
GamifiveSDK.onStartSession(function() {  
  startMatch();
});

// new method to call GamifiveSDK.startSession()
function playGame(){
  GamifiveSDK.startSession();
}
```

```html
<!-- button to start a game match -->
<button onclick="playGame()">START MATCH</button>
```

Here's a simple schema:
<img src="http://s2.motime.com/js/wl/webstore_html5game/gfsdk/manual/start_flow.png" width="100%" />

## 4) Ending a session

Ideally a session ends when the player cannot go on with his match and must play again from the beginning. 
Usually - but not necessarily - endSession occurs in the 'Game Over' state. 

### Lite Mode

To end a session in lite mode, you have to:

<ol>
	<li>call <i>GamifiveSDK.endSession({ score: Number, level: Number })</i> method.
		You should call it passing an object as parameter - this object can contain:
	   <ul> 
	       <li> an attribute <b>score</b>, which is the score realized by the player during the game session. This value must be a number (not string). </li>
    	   <li> an attribute <b>level</b>, which is the level reached by the player during the game session. This value must be a number and it will be saved for later use in the sdk configuration (you can retrieve it into <b>GamifiveSDK.getConfig().user.level or GamifiveSDK.getLevel() starting from version v2.3.x</b>).
    	   </li>
    	   <li>
    	   No attributes at all: in this case the SDK will only save the game session (starting and ending time).
    	   </li>
	   </ul>
	</li>
</ol>

Here's a simple schema of the flow you have to follow for saving and retrieving the level reached by the player.
<img src="http://s2.motime.com/js/wl/webstore_html5game/gfsdk/manual/levelsaving.png" width="100%" />

<h3>Normal (non-lite) Mode</h3>

To end a session in non-lite mode, you have to:

<ol>
	<li>call <i>GamifiveSDK.endSession</i> method.
		You should call it passing an object as parameter - this object can contain:
	   <ul> 
    	   <li> an attribute <b>score</b>, which is the score realized by the player during the game session. This value must be a number (not string). 
    	   </li>
    	   <li>No attributes at all: in this case the SDK will only save the game session (starting and ending time).
    	   </li>
	   </ul>
	</li>
	<li>remove your game over screen - you have to remove your game over screen because the SDK also displays a game over screen. If you don't remove your game over screen, there will be two duplicate screens
	</li>
</ol>

```javascript
// call this method when a user ends a game session
var scoreGame = 7888;
GamifiveSDK.endSession({
    score: scoreGame
});
```

# Other methods

## saveUserData

Saves an Object containing the player's progress.

```javascript
// the structure of this object is just an example
var playerProgress = {
    level1: {
        unlocked: true,
        stars: 3
    },
    level2: {
        unlocked: false,
        stars: 0
    }
};

// saves the object containing the player's progress
GamifiveSDK.saveUserData(playerProgress); 
```

GamifiveSDK.saveUserData internally uses JSON.stringify and actually saves the object as a string, but this is an internal procedure and **you MUST pass an object**, not a JSON string, as a parameter to GamifiveSDK.saveUserData.

## loadUserData

Retrieves the JSON string containing the player's progress and returns it as a JavaScript Object.
This method make a call to our server and **must be called AFTER GamifiveSDK.init();**

```javascript
// returns an object containing the player's progress

GamifiveSDK.init();
var userProgressInGame = {};
GamifiveSDK.loadUserData(function(userProgressSaved){
    if(userProgressSaved){
        //else load userprogress in the game
        userProgressInGame = userProgressSaved;
    }
    //start the game with the userProgress loaded
});
```

## clearUserData

Deletes the player's progress.

```javascript
// the previously saved progress is deleted
GamifiveSDK.clearUserData();
```

## showMoreGamesButton

Shows a built-in more games button. If no parameters are passed, the button is created with default style, otherwise the object passed as parameter will be used as a custom style.

```javascript
// display the button with default style:
GamifiveSDK.showMoreGamesButton();

!!Deprecated!!
// display the button with custom style:
GamifiveSDK.showMoreGamesButton({left: '2px', height: '44px'});

//Use this instead
GamifiveSDK.showMoreGamesButton();
```

## hideMoreGamesButton

Hides the more games button (if it was previously shown).

```javascript
GamifiveSDK.hideMoreGamesButton();
```

\## goToHome

Redirects to Gamifive's Homepage. Call this function when your more games button is clicked.

```javascript
// perform a redirect to the homepage

GamifiveSDK.goToHome();
```

\## getAvatar
You can get the user's avatar by calling <i>GamifiveSDK.getAvatar()</i>.

```javascript
var avatar = GamifiveSDK.getAvatar();
```

It returns an object containing two fields:

<ul>
	<li><b>src</b>: base64 of avatar</li>
	<li><b>name</b>: name of avatar file</li>
</ul>
We recommend using a <i>src</i> field for showing the avatar in the game.

\## getNickname
You can get the user's nickname by calling <i>GamifiveSDK.getNickname()</i>.

```javascript
var avatar = GamifiveSDK.getNickname();
```

### Example

```javascript
GamifiveSDK.init({
    lite: true
});
```

## Lite Mode

We remind you that in order to use GamifiveSDK in lite mode, you have to call <i>Gamifive.init</i> with <i>lite: true</i> in the configuration argument.

### GamifiveSDK.init

### GamifiveSDK.onStartSession

Register a callback function any time a session start

GamifiveSDK.onStartSession(function yourFunction(){
    //do things everytime a session start
});

## Full implementation example

```javascript
GamifiveSDK.onStartSession(function(){
    // do somenthing everytime a session starts
});

// You can run this on body onload event or on document content load or as soon as you can
// could be an empty object: default lite = false
GamifiveSDK.init({ lite: true });

// your userData empty structure
var emptyStructure = {
    level1: { 
        unlocked: false, 
        stars: 0,
        score: 0
    }, 
    level2: {
        unlocked: false, 
        stars: 0,
        score: 0
    } 
}

var userProgressInGame = {};
GamifiveSDK.loadUserData(function(userProgressSaved){
    if(userProgressSaved){
        //else load userprogress in the game
        userProgressInGame = userProgressSaved;
    }
    //start the game with the userProgress loaded
});

GamifiveSDK.startSession();

// Persist user data when somenthing happens. Change in settings or end of the level
GamifiveSDK.saveUserData({
    level1: { 
        unlocked: true, 
        stars: 2,
        score: 300
    }, 
    level2: {
        unlocked: false, 
        stars: 0,
        score:0
    } 
});

GamifiveSDK.endSession({ score: 300, level: 1 });
```

### API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### onLoadUserDataCb

Called when the data, saved with saveUserData,
has been loaded from server

Type: [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)

**Parameters**

-   `userProgress` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | null)** 

#### init

Initialize the sdk

**Parameters**

-   `initConfig` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `initConfig.lite` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if should show the gameover
    -   `initConfig.moreGamesButtonStyle` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** a custom styles to pass to moregames button

#### getConfig

Returns the whole state!

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

#### getLevel

Returns the number of the last level reached by user

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

#### showMoreGamesButton

Shows the menu|moregames button.
call this function when in pause

#### hideMoreGamesButton

Hides the menu | moregames button
call this function when on pause exit

#### loadUserData

Loads the arbitrary data from our server.
Returns somenthing only for retrocompatibility.
Since version >=2 must be called with the callback signature

**Parameters**

-   `onLoadUserDataCb` **SDK~onLoadUserData** The callback that handles the response.
-   `onLoadUserData`  

Returns **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined))** 

#### saveUserData

Save an arbitrary object on server and on local

**Parameters**

-   `userDataInfo` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

#### clearUserData

Clear the user data saved on local and on server.
Use this function only under explicit user input

#### goToHome

Redirect the browser to the game portal

#### getAvatar

Get the user avatar if any.

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** avatarObj

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** avatarObj.src - the url of the avatar object

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** avatarObj.nickname - the name of the user

#### getNickname

Get the userNickName if any. otherwise undefined

Returns **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined))** 

#### onStartSession

Register a function that will be called
on each startSession call

**Parameters**

-   `onStartSessionCallback` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 

#### startSession

Starts a session. If the init it's still in pending
the session will start on init finished

#### endSession

Ends a session and calculate the session time.
This function can be called without params.
In this case only the session time is calculated. 
It can be called also with just the score and in this case the level is implicitly 1
this is useful for games without levels.

**Parameters**

-   `scoreAndLevel` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?**  (optional, default `{score:0,level:1}`)

#### getVersion

Get the version object

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** version

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** version.version - The commit string in semantic version syntax

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** version.build - The hash of the commit version refers
