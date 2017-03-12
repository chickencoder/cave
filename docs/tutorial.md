Tutorial
========

> For version 0.2.3-alpha

## Editor basics
When live coding it's best to know the quickest shortcuts for reptitive tasks
such as running/stopping code. As well as using the buttons along the top bar,
Cave comes with some keyboard shortcuts...

| Shortcut | Mapped to         |
| :------- | :-----------------|
| Alt-r    | Run / Update code |
| Alt-s    | Stop code         |

## Mixers & Tracks
Tracks are the underlying building block of a Cave program. A track is given
a sample (sound file) and then can be sequenced to create rhythms, melodies etc. Mixers enable tracks to be grouped together and manipulated.

## Creating a track
```javascript
mix.set("kick_track", new track("kick"));
```

The code above is an example of how we might create a track in Cave.
The `mix` object is a global pre-defined mixer than is routed to the main
audio output of your browser. Here we are setting up a new track within our
mixer with the id of `kick_track` which uses the `kick` sample from the default
sample pack.

Currently, this line of code won't produce any sound because we haven't told
Cave when to play this sample. This requires the following line of code...

```javascript
mix.get("kick_track").tick(t => every(t, 2));
```

This line gets our `kick_track` track from the mixer and then sequences it using
the `tick` method. Every track has a tick method which takes a single function
as an argument. For every tick of the program (equivalent to a 16th note), the
function passed in as an argument will be called. If the function returns 1, then
the sample is played. If the function returns 0, then the sample is not played.

The example given above uses the ES6 arrow function syntax which is equivalent
to the following older syntax....
```javascript
mix.get("kick_track").tick(function(t) {
    return every(t, 2);
});
```

If your browser supports arrow functions, it is suggested that you use them
for speed sake when live coding.

## T is for ticks

The `t` argument taken in the callback method to our tick function is the global
tick count and represents how many ticks have been since the clock was started.
This value can be used to affect the result of the function, for instance, with
the modulus operator (%) and a ternary expression, we can return `1` every four ticks like so...

```javascript
mix.get("kick_track").tick(t => t % 4 == 0 ? 1 : 0)
```

This would produce the same result as...

```javascript
mix.get("kick_track").tick(function(t) {
  if (t % 4 == 0) {
    return 1;
  } else {
    return 2;
  }
});
```

To make the creation of tick callbacks easier, Cave provides 2 helper functions: `euclid` and `every`.

The `euclid` function produces a Euclidian Rhythm and the `every` function
will return 1 every given number of ticks.

```javascript
mix.get("kick_track").tick(t => euclid(t, 3, 8));
// and ...
mix.get("kick_track").tick(t => every(t, 2));
```

**Side note:** It can get tiring writing `mix.get` multiple times so here are
two shortcuts. Firstly just use the global `get` and `set` functions instead of `mix.get` and `mix.set`. Secondly, if we call functions on a track, we can chain them like this...

```javascript
get("kick_track").tick(t => every(t, 2)).rate(0);
```

## Die tracks!
If you need to remove a track from the mixer, you can use the `mix.kill` method or use the global `kill` function.

## Controlling sample pitch
As well as triggering samples, we can change their pitch and rate with the `rate` method. The rate method takes a function (argument t), which returns the number of steps above the current rate the function should be played at.

```javascript

```

### We can randomize things
