# ![Candid Capture](https://user-images.githubusercontent.com/50911194/103921555-b4906800-5123-11eb-9f51-7cbc69a807b1.png)

This IOT-based smart home appliance uses a combination of your environment, audio and emotion to determine when to capture candid photos to capture your and your family’s special moments. This app is a great appliance for families to capture fun moments between family members or improve your mood by playing happy songs when you are sad.

- We have divided our code into different branches to seperate the different parts of our system
- Except for Flutter and the Master the other branches are only to have a look at and aren't necessarily functional

# Built with
* NodeJs
* TensorFlow
* Node-red
* MongoDB
* Flutter


# Getting started

- Clone this repo
- `npm install express mongoose mqtt --save` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `node app.js` to start the local server
- Follow this ([tutorial](https://nodered.org/docs/getting-started/local)) and install Node-RED locally on your machine.
- Import `Node-red/spotify_flow.json` into your Node-RED instance.
- Follow this ([tutorial](https://flutter.dev/docs/get-started/install)) and install Flutter locally on your machine.
- Run the Flutter app from the `flutter` branch.


## Dependencies

- [express](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [mqtt](https://github.com/mqttjs/MQTT.js) - For the MQTT protocol, written in JavaScript for node.js and the browser.


## Using node-red's Spotify integration
- To use the Spotify tool in node red you will have to make an account on Spotify.
- After creating your account go to [Spotify Developers](https://developer.spotify.com/dashboard/) to login and create an App to get a Client ID and Secret.
- Enter your Client ID and Client Secret in the Spotify Node.
- This is the scope to [Start/Resume a Users Playback](https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/); `user-modify-playback-state`.
- After authorizing you Select the API "play" and you are done with setting up the Spotify node.
- Please refer to the Spotify's [Web API](https://developer.spotify.com/documentation/web-api/reference/) reference to know about utilizing other API's.
 <b> Please note: to use the 'Play' functionality you must have Spotify premium activated </b>
 
 
# Overall Architecture
 
## Edge-device functionalities
The following diagram shows the functionalities of the browser which acts as our edge device.
![Edge device](https://user-images.githubusercontent.com/50911194/103926728-5ca92f80-512a-11eb-8ade-c84345a05095.PNG)

## Configuration
Users can modify the various settings of their home system such as; <b> Camera on/off, camera timmings, camera frequency, spotify album</b>. The following is the pictorial representation of changing the configuration.
![configuration](https://user-images.githubusercontent.com/50911194/103927893-194fc080-512c-11eb-86a3-efd7f5faffc2.PNG)

## Handling Images
The following flow diagram outlines how the edge device, server, browser and flutter are integrated when the appropriate picture is taken.
![handling images](https://user-images.githubusercontent.com/50911194/103928414-dc37fe00-512c-11eb-8374-dbfa7c2b59c8.PNG)


## License


## Authors
Project was build was part of our University Internet of Things course at AUS by

- [Jeremy Dsilva](https://github.com/JeremyDsilva)  
- [Dhriti Adyanthaya](https://github.com/dhritix1999)  
- [Shaham Kampala](https://github.com/skampala1) 
 
