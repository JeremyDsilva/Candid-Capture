# ![Candid Capture](https://user-images.githubusercontent.com/50911194/103921555-b4906800-5123-11eb-9f51-7cbc69a807b1.png)

IoT smart home appliance that captures candid photos of your family’s special moments using a combination of emotion detection and phrase detection. This app is a great appliance for families to capture fun moments between family members or improve your mood by playing happy songs when you are sad.

# Built with
* NodeJs
* Mosquito
* Node-red
* MongoDB
* Flutter


# Getting started
To run the application, you will need Node JS, MongoDB, Mosquito, Node red and Futter installed on your machine.

- Clone this repo
- Navigate to the server folder, install the required dependencies and run `node app.js` to start the local server
- Import `Node-red/spotify_flow.json` into your Node-RED instance from the node-red folder.
- Navigate to the fultter folder to run the Flutter app.

## Using node-red's Spotify integration
- To use the Spotify tool in node red you will have to make an account on Spotify.
- After creating your account go to [Spotify Developers](https://developer.spotify.com/dashboard/) to login and create an App to get a Client ID and Secret.
- Enter your Client ID and Client Secret in the Spotify Node.
- This is the scope to [Start/Resume a Users Playback](https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/); `user-modify-playback-state`.
- After authorizing you Select the API "play" and you are done with setting up the Spotify node.
- Please refer to the Spotify's [Web API](https://developer.spotify.com/documentation/web-api/reference/) reference to know about utilizing other API's.
 <b> Please note: to use the 'Play' functionality you must have Spotify premium activated </b>
 
 ## Using MQTT
 Websockets are used on the edge device using port 9001. Add the following configration to the mosquitto.conf file.
 
```
listener 443
protocol websockets
```
# Views

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
 
