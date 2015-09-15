<p align="center">
  <h1>Fingerprintjs2</h1>
  <a href="https://travis-ci.org/Valve/fingerprintjs2"><img src="http://img.shields.io/travis/Valve/fingerprintjs2/master.svg?style=flat" /></a>
  <a href="https://gitter.im/Valve/fingerprintjs2"><img src="https://badges.gitter.im/Valve/fingerprintjs2.png"/></a>
</p>

Original fingerprintjs library was developed in 2012, it's now impossible to evolve it
without breaking backwards compatibilty, so this project will be where
all the new development happens.

This project will use significantly more sources for fingerprinting, all
of them will be configurable, that is it should be possible to
cherry-pick only the options you need or just enable them all.

I'm also paying special attention to IE plugins, popular in China, such
as QQ, Baidu and others.

This project will not be backwards compatible with original
fingerprintjs.

This project uses semver.

### Installation

#### CDN:
```
//cdn.jsdelivr.net/fingerprintjs2/<VERSION>/fingerprint2.min.js
```

#### Bower

```
bower install fingerprintjs2
```

#### NPM

```
npm install fingerprintjs2
```


### Usage

```javascript

new Fingerprint2().get(function(result){
  console.log(result);
});
```

#### You can pass an object with options (all of which are optional):

```javascript
var options = {swfPath: '/assets/FontList.swf', excludeUserAgent: true};
new Fingerprint2(options).get(function(result){
  console.log(result);
});
```

Full list of options will be in the
(https://github.com/Valve/fingerprintjs2/wiki/List-of-options) wiki
page.

Flash font enumeration is disabled by default. JS code is used by
default to get the list of available fonts.

The reason for this  is that Flash will not work in incognito mode.

However, you can make the library to use Flash when detecting the fonts
with:

```js
excludeJsFonts: true
```
option.

To use Flash font enumeration, make sure you have swfobject available.
If you don't, the library will skip the Flash part entirely.


##### All fingerprinting sources are enabled by default, i.e. you don't need to explicitly configure the library to include them.

```js
new Fingerprint2().get(function(result){
  // this will use all available fingerprinting sources
  console.log(result);
});
```

#### View the fingerprint locally

You can view your browser fingerprint locally by starting a webserver and viewing the index.html page.
Loading index.html from the filesystem won't work due to Flash's ExternalInterface security restrictions.

To start a web server you can use either Ruby:

```
ruby -run -e httpd . -p 8080
```
or Python

```
# will load on port 8000
python -m SimpleHTTPServer
```

### List of fingerprinting sources

1. UserAgent
2. Language
3. Color Depth
4. Screen Resolution
5. Timezone
6. Has session storage or not
7. Has local storage or not
8. Has indexed DB
9. Has IE specific 'AddBehavior'
10. Has open DB
11. CPU class
12. Platform
13. DoNotTrack or not
14. Full list of installed fonts (maintaining their order, which increases the entropy), implemented with Flash.
15. A list of installed fonts, detected with JS/CSS (side-channel technique) - can detect up to 500 installed fonts without flash
16. Canvas fingerprinting
17. WebGL fingerprinting
18. Plugins (IE included)
19. Is AdBlock installed or not
20. Has the user tampered with its languages
21. Has the user tampered with its screen resolution
22. Has the user tampered with its OS
23. Has the user tampered with its browser
24. Touch screen detection and capabilities


### Many more fingerprinting sources will be implemented, such as
(in no particular order)

* Multi-monitor detection,
* silverlight integration,
* Flash linux kernel version,
* Internal HashTable implementation detection
* WebRTC fingerprinting
* Math constants
* Accessibility fingerprinting
* Camera information
* DRM support
* Accelerometer support
* Virtual keyboards
* List of supported gestures (for touch-enabled devices)
* Pixel density
* Video and audio codecs availability

#### To recompile the FontList.swf file:

* Download Adobe Flex SDK from:  http://www.adobe.com/devnet/flex/flex-sdk-download.html
* Unzip it, add the bin/ directory to your $PATH  (mxmlc binary should be in path)
* Run "make"

#### License: MIT or Apache, whichever you prefer.
