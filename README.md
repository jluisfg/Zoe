# zoe
Zoe Water Mobile Application

## Dependencies

* NPM
* Cordova [Installation guide](https://cordova.apache.org/docs/en/4.0.0/guide_cli_index.md.html)
* Gulp [Getting started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
* Bower http://bower.io/
* Xcode for building iOS
* Android ADT Bundle configured

## Building iOS From source
First you need to clone this repo, then open a terminal window and go to the project directory root and run the following commands (only if you want to build from source):

```
$ bower install
$ npm install
$ sh build.ios.sh
$ cordova build ios
```

## Building iOS right from the current buid (www)
For building whatever is in the www directory, this may be the your prefferred method if you only need to build your xcode project for distributing the app, for such thing just run the following:

```
$ npm install
$ cordova build ios
```

This will copy whatever is in the www directory and build an xcode project with it.

Now you need to open Xcode and do the following:

* Make sure an application scheme has been loaded, create yours otherwise.
* Go to Product -> Analyze
* After the analisys has been passed go to Product -> Archive

After the archive is complete Xcode will open the Organizer application, from there you can export an IPA or upload right to iTunes Connect, up to you.

* To create an IPA just click on the Export button
* To submit to iTunes hit the submit button
* To validate your certificate hit validate, this will tell you if your build is valid or not.

For testing on a device you have to use Xcode too:

1. Select your app scheme.
2. Make sure your device is connected to your computer using an original Apple USB Cable.
3. Select your device on the simulators dropdown
4. Hit the play button
