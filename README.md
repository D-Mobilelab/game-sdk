[![Build Status](https://travis-ci.org/D-Mobilelab/game-sdk.svg?branch=master)](https://travis-ci.org/D-Mobilelab/game-sdk)

# GameSDK v2.x

# Table of Contents
+ [Setup the debug env](#setup-debug-environment)
  - [Install node and npm](#install-node-and-npm)
  - [Clone the repo](#clone-the-repo)
  - [Edit your host file](#edit-your-host-file)
  - [Add dependencies to your index.html](#add-dependencies-to-your-index)
  - [Copy the game in sample > mygamefolder](#copy-the-game-in-sample-mygamefolder)
  - [Run the local server](#run-the-local-server)
+ [An implementation example](#an-implementation-example)
+ [Before sending](#before-sending)
+ [Aliases](#aliases)

### Setup debug environment

The debug environment is simply a server running on localhost. To make a full test of save and load user data progress you need to register a domain in your hosts file compatibile with our service.
In order to avoid a QA rejection we suggest to use it the local server on day one (and help us to improve it with your feedback)

#### Install node and npm
Probably you already have this installed in your PC/Mac but just in case here are the tutorial to setting up in environment for development:
-   Mac Users can follow this guide: <http://blog.teamtreehouse.com/install-node-js-npm-mac>
-   Windows Users can follow this one: <http://blog.teamtreehouse.com/install-node-js-npm-windows>
    (Some other of billions guides on the web anyway will be ok)
- Linux Users can simply follow the NodeJS guide <https://nodejs.org/en/download/package-manager/>

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
<script type="text/javascript" src="../gfsdk.js"></script>
```
__Optional__
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

Go to the setup page [http://local.appsworld.gamifive-app.com:8080/setup.html](http://local.appsworld.gamifive-app.com:8080/setup.html)

1.  game_id: 
    if you already have your game in our server you can put the game_id here otherwise leaves the default
2.  user_id: 
    if you already have a user_id provided by us use it otherwise leaves the default
3.  user_type: premium | guest (unlogged) | free (facebook)
4.  url_to_launch:
    Suppose you have copied you game in sample/myfolder this field should be "/myfolder/index.html"

Then you can simply click "Set" and "Launch". This will redirect you to[http://local.appsworld.gamifive-app.com:8080/myfolder/index.html](http://local.appsworld.gamifive-app.com:8080/myfolder/index.html)

### An implementation example

```javascript
// mygamefolder/index.html
// It's better to put the initialization in your index.html as soon as possible
GamfiveSDK.init({ lite: true }); // lite false means without gameover
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
GamfiveSDK.startSession();

// When the user finish to play
GamifiveSDK.endSession( { score: 123456789, level: 1 } );
// This will saves the state on our server and on local
// N.B. The object is just an example. You can structure it however you want
GamifiveSDK.saveUserData({ level1: { score: 123456789, unlocked: true } });

// on enter pause
GamifiveSDK.showMoreGamesButton();

// on exit pause
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