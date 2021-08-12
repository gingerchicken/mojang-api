# mojang-_promise_-api
[![Build Status](https://travis-ci.com/gingerchicken/mojang-promise-api.svg?branch=master)](https://travis-ci.com/gingerchicken/mojang-promise-api)

`mojang-promise-api` is a simple but effective wrapper around the [Mojang API](http://wiki.vg/Mojang_API). It is simple and low-dependency (only needing the
__fabulous__ [Axios](https://www.npmjs.com/package/axios) library). This package was originally forked from the [`mojang-api`](https://github.com/minecrafter/mojang-api) project, however it was fitted to work with [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) rather than callback functions.

## Installation
    npm i mojang-promise-api

## Usage

### Instatitation

```js
const MojangAPI = require('mojang-promise-api');
let api = new MojangAPI(); // All good to go!
```

### MojangAPI.uuidAt(username, time)

Parameters:

 * **username**: The username to resolve the UUID for
 * **time**: Either a Date or a Number

Example:
```js
const MojangAPI = require('mojang-api');
let api = new MojangAPI();

// Just set up a date.
var date = new Date();
date.setMonth(0); // Just as an example, let's set the month to January (i.e. the first month)

api.uuidAt('jeb_', date)
.then(res => {
    console.log("On " + date + ", jeb_'s UUID was " + res.id);
})
.catch(err => {
    console.log(err);
});
```

### MojangAPI.nameHistory(uuid, cb)

Parameters:

 * **uuid**: The UUID to look up

Example:
```js
const MojangAPI = require('mojang-promise-api');
let api = new MojangAPI();

// 853c80ef3c3749fdaa49938b674adae6 is the UUID of _jeb
api.nameHistory('853c80ef3c3749fdaa49938b674adae6')
.then((res) => {
    if (res.length == 1) {
        console.log(res[0].name + " is very content with their existing username, because they didn't change it. Excellent job.")
    } else {
        let lastChange = res[res.length - 1];
        let at = new Date(lastChange.changedToAt);
        console.log(lastChange.name + " wasn't so content with their username. They last changed their username at " + at + ".");
    }
})
.catch((err) => {
    console.log(err);
})
```

### MojangAPI.nameToUuid(names)

Parameters:

 * **names**: The names to look up as an array or a single username as a string

Example:
```js
const MojangAPI = require('mojang-promise-api');
let api = new MojangAPI();

api.nameToUuid('jeb_')
.then(res => {
    console.log(res[0].name + "? No, they're " + res[0].id + " to me.");
})
.catch(err => {
    console.log(err);
});
```

### MojangAPI.profile(uuid, cb)

Parameters:

 * **uuid**: The UUID to lookup

Example:
```js
const MojangAPI = require('mojang-api');
let api = new MojangAPI();

// Once again, jeb_'s UUID
api.profile('853c80ef3c3749fdaa49938b674adae6')
.then((res) => {
    console.log(res.id + " is also known as " + res.name + ".");
})
.catch(err => {
    console.log(err);
});
```
