[![Build Status](https://travis-ci.org/D-Mobilelab/game-sdk.svg?branch=master)](https://travis-ci.org/D-Mobilelab/game-sdk)
[![Coverage Status](https://coveralls.io/repos/github/D-Mobilelab/game-sdk/badge.svg?branch=master)](https://coveralls.io/github/D-Mobilelab/game-sdk?branch=master)

# GameSDK v2.x
Tech docs [https://d-mobilelab.github.io/game-sdk/docs/2.6.0/](https://d-mobilelab.github.io/game-sdk/docs/2.6.0/)
# Table of Contents

-   [Setup the debug env](#setup-debug-environment)
    -   [Install node and npm](#install-node-and-npm)
    -   [Clone the repo](#clone-the-repo)
    -   [Edit your host file](#edit-your-host-file)
    -   [Add dependencies to your index.html](#add-dependencies-to-your-index)
    -   [Copy the game in sample > mygamefolder](#copy-the-game-in-sample-mygamefolder)
    -   [Run the local server](#run-the-local-server)
-   [An implementation example](#an-implementation-example)
-   [Before sending](#before-sending)
-   [Aliases](#aliases)

### Setup debug environment

The debug environment is simply a server running on localhost. Register an alias in your hosts file is needed to make work newton and the save
and load user data progress. In this way you can test your game with load, save, gameover and you will
avoid a QA rejection. 
We recommend to use the local server to test your game before send us the package (and help us to improve it with your feedback)

#### Install node and npm

Probably you already have this installed in your PC/Mac but just in case here are the tutorial to setting up in environment for development:

-   Mac Users can follow this guide: <http://blog.teamtreehouse.com/install-node-js-npm-mac>
-   Windows Users can follow this one: <http://blog.teamtreehouse.com/install-node-js-npm-windows>
    (Some other of billions guides on the web anyway will be ok)
-   Linux Users can simply follow the NodeJS guide <https://nodejs.org/en/download/package-manager/>

#### Edit your host file

You should add this line to your file hosts 
( [How to edit my host file?](http://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/) )

```javascript
   127.0.0.1 local.appsworld.gamifive-app.com
```

### Clone the repo

```javascript
git clone https://github.com/D-Mobilelab/game-sdk.git
```

#### Add dependencies to your index

Copy and paste these two scripts in the head tag of your html

```javascript
<script src="http://static.newton.pm/js/v2.x/newton.min.js"></script>
<script type="text/javascript" src="../vendor.js"></script>
<script type="text/javascript" src="../gfsdk.js"></script>
```

**Optional**
If you want to see the gameover with the style add this optional css tag into your head

```javascript
<link rel="stylesheet" href="http://s.motime.com/tbr/less.css?file=app-gameover.less&country=ww-appsworld&t=20170111153950" />
```

#### Copy the game in sample > mygamefolder

Put the game in game-sdk/sample/myfolder where myfolder could have any name you prefer

#### Run the local server

```javascript
npm run dev
```

Go to the setup page <http://local.appsworld.gamifive-app.com:8080/setup.html>

1.  game_id: 
    if you already have your game in our server you can put the game_id here otherwise leaves the default
2.  user_id: 
    if you already have a user_id provided by us use it otherwise leaves the default
3.  user_type: premium | guest (unlogged) | free (facebook)
4.  url_to_launch:
    Suppose you have copied you game in sample/myfolder this field should be "/myfolder/index.html"

Then you can simply click "Set" and "Launch". This will redirect you to<http://local.appsworld.gamifive-app.com:8080/myfolder/index.html>

### An implementation example

```javascript
// mygamefolder/index.html
// It's better to put the initialization in your index.html as soon as possible
GamifiveSDK.init({ lite: true }); // lite false means without gameover
GamifiveSDK.loadUserData(function(userData) {
    // UserData is null the first time or after a clearUserData() call
    // The userData is associated with userid-gameid combination
    // You can integrate this function with your assets loader
    // for example in construct2 you can send a signal to the loader

    // N.B. getDefaultUserData() implementation it's your implementation responsability
    // and should return a javascript object
    var initialState = userData ? userData : getDefaultsUserData();
    initGame(initialState);
});

GamifiveSDK.onStartSession(function(){
    // this will be called every time a start session is called    
})

// When the user play:
GamifiveSDK.startSession();

// When the user finish to play
GamifiveSDK.endSession( { score: 123456789, level: 1 } );
// This will saves the state on our server and on local
// N.B. The object is just an example. You can structure it however you want
GamifiveSDK.saveUserData({ level1: { score: 123456789, unlocked: true } });

// The more games button is a floating action button that once clicked redirect the user
// to our portal. It's needed to show this button in your pause event
GamifiveSDK.showMoreGamesButton();

// On exit pause hide the more games button
GamifiveSDK.hideMoreGamesButton();
```

# Before sending

Before sending the package just remove newton and css from the index.html
and include only this tag in your head

```javascript
<script id="gfsdk" src="http://s.motime.com/js/wl/webstore_html5game/gfsdk/dist/gfsdk.min.js"></script>
```

# Aliases

These are valid aliases too for game-sdk in window main scope

```javascript
- GamefiveSDK 
- DocomoSDK
- GamifiveSdk
- GamefiveSdk
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
    -   `initConfig.moreGamesButtonStyle` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** DEPRECATED since v2.5.3: a custom styles to pass to moregames button
    -   `initConfig.menuPosition` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** TOP_LEFT, BOTTOM_LEFT, TOP_RIGHT, BOTTOM_RIGHT (optional, default `'BOTTOM_RIGHT'`)

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

#### getConfig

Returns the whole state!

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

#### getLevel

Returns the number of the last level reached by user

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

#### showMoreGamesButton

Shows the menu|moregames button.
call this function when in pause

**Parameters**

-   `position` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** custom position

#### hideMoreGamesButton

Hides the menu | moregames button
call this function when on pause exit

#### loadUserData

Loads the arbitrary data from our server.
Returns somenthing only for retrocompatibility.
Since version >=2 must be called with the callback signature

**Parameters**

-   `onLoadUserData`  
-   `onLoadUserDataCb` **SDK~onLoadUserData** The callback that handles the response.

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

-   `scoreAndLevel` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{score:0,level:1}`)

#### getVersion

Get the version object

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** version

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** version.version - The commit string in semantic version syntax

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** version.build - The hash of the commit version refers

#### isInitialized

Returns if the sdk has been initialized

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
