---
title: Notes on Raspberry Pi & Arduino
slug: notes-on-raspberry-pi-and-arduino
date: 2015-05-15 21:16
tags:
 - raspberrypi
 - arduino
 - javascript
 - node.js
---

Using NOOBS, install Raspian. It's probably the most supported distro for the Pi. (https://www.raspberrypi.org/help/noobs-setup/)

Setup the Raspberry Pi to connect automatically to WiFi. I've used a TP-Link TL-WN321G without any issues. (http://weworkweplay.com/play/automatically-connect-a-raspberry-pi-to-a-wifi-network/)

I'm using an old pre-2011 Arduino Uno. It's firmware version is actually 0.00, but I was able to get it working with Firmata. Firmata is a library which enables communication between host and arduino. It allows you to use JavaScript frameworks such as http://johnny-five.io/ to control your arduino with Node.

You only need to put Firmata on the arduino once, so I did it on my MacBook. After this, the Arduino just starts up ready to communicate. No more programming required. Tethering is required, as the *host* will now wear the trousers.

First, download the Arduino IDE. On OS X, `brew cask update && brew cask install arduino`. Once installed, run it, make sure the arduino is connected via USB. Make sure the correct board and port are seleted in the IDE. Go to File, Examples, Firmata, and then StandardFirmata. Upload this to your board. Now you're set.

Let's quickly test it. Using Node, install `johnny-five`. Then stick an LED in Arduino pins `13` and `GND`. Then run the hello world blink code:

    var five = require("johnny-five"),
        board = new five.Board();
    
    board.on("ready", function () {
        var led = new five.Led(13);
        led.blink(500);
    });
    
The LED should blink. If it doesn't, it's time to get your Google on.

Moving on, we want to control the Arduino via the Raspberry Pi. For this, you need to manage your power consumption properly.

Step 1. Power on raspberrypi with WiFi dongle connected. Wait for it to connect to network.  
Step 2. Start a continuous ping of the raspberrypi to check it's connectivity.  
Step 3. Power on your arduino with an external power supply.  
Step 4. Plug in the USB into the raspberrypi.  
Step 5. Plug in the USB to the arduino.  

I don't know for sure, but I think that by powering on the arduino with external power first and then connecting it via USB, it disables the USB power consumption, which stops your raspberrypi from throwing a fit.

Next article will cover: johnny-five arduino code/setup
