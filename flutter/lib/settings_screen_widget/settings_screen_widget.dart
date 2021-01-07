/*
*  settings_screen_widget.dart
*  candidCam
*
*  Created by Shaham Kampala. Final
*  Copyright . All rights reserved.
    */

import 'package:candid_cam/values/values.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mqtt_client/mqtt_client.dart';
import 'package:mqtt_client/mqtt_server_client.dart';
import 'package:candid_cam/mqtt.dart';
import 'dart:async';
import 'dart:convert';
import 'package:candid_cam/values/getting_image_from_api.dart';
import 'package:http/http.dart' as http;

class SettingsScreenWidget extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return SettingsScreenState();
  }
}

class SettingsScreenState extends State<SettingsScreenWidget> {
  Future<Config> futureConfig;
  TimeOfDay _amtime = TimeOfDay.now();
  TimeOfDay _pmtime = TimeOfDay.now();

  int startTime;
  int endTime;

  TimeOfDay picker;
  TimeOfDay pickedtimesecond;
  String _timefirst = "FROM";
  String _timesecond = "TILL";
  int firsttime;
  int secondtime;
  int firstmin;
  int secondmint;
  Future<void> _timepicker(BuildContext context) async {
    // MaterialLocalizations localizations = MaterialLocalizations.of(context);
    picker = await showTimePicker(context: context, initialTime: _amtime);
    setState(() {
      if (picker != null) {
        _amtime = picker;
        print(_amtime);

        startTime = _amtime.hour * 60 + _amtime.minute;

        // _timefirst =  DateFormat.Hms().format(_time);
        _timefirst = _amtime.format(context);
        print(_timefirst);
        print(startTime);
      }
    });
  }

  Future<void> _timepickersecond(BuildContext context) async {
    // MaterialLocalizations localizations = MaterialLocalizations.of(context);
    pickedtimesecond =
        await showTimePicker(context: context, initialTime: _pmtime);
    setState(() {
      if (pickedtimesecond != null) {
        _pmtime = pickedtimesecond;
        _timesecond = _pmtime.format(context);
        // _timefirst =  DateFormat.Hms().format(_time);
        endTime = _pmtime.hour * 60 + _pmtime.minute;

        print(_timesecond);
        print(endTime);
        print(_amtime.hour);
        firsttime = int.parse(_amtime.hour.toString());
        firstmin = int.parse(_amtime.minute.toString());
        secondtime = int.parse(_pmtime.hour.toString());
        secondmint = int.parse(_pmtime.minute.toString());
        print("min:" + secondmint.toString());
        if (firsttime >= 8 &&
            firsttime <= 12 &&
            firstmin >= 0 &&
            secondtime >= 12 &&
            secondtime <= 21 &&
            secondmint <= 30) {
          Scaffold.of(context).showSnackBar(
            SnackBar(
              content: const Text("you selected time in between 8 to 9:30"),
            ),
          );
        }
      }
    });
  }

  bool state = false;
  String freq = "";
  String album = "";
// void _onMessage(String topic, String payload){
//   print('my own onMessage'+topic+':'+payload);
//   //call api refreshed

// }
  // MQTTClient cl;

  // void setUpMQTT() async {
  //   // create an MQTT client.
  //   cl = new MQTTClient('10.0.2.2', '1883',_onMessage );
  //   await cl.connect();
  //   cl.subscribe('coe457/hello', null);
  // }

  void initState() {
    super.initState();
    // initialize MQTT
    //setUpMQTT();

    // get json from server and update fields on app setting screen
    futureConfig = fetchConfig();

    // state = config.cam_state;
  }

  var check1;
  var check2;
  Future<Config> fetchConfig() async {
    final response = await http.get('http://10.0.2.2:3000/config');

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.

      Config config = Config.fromJson(jsonDecode(response.body));

      print("after getting json data");
      print(config.cam_state);
      print(config.cam_freq);
      print(config.start_time);
      print(config.end_time);
      print(config.album);

      setState(() {
        state = config.cam_state;
        freq = (config.cam_freq).toString();
        album = config.album;

        // check1 = config.start_time.split("-").toList();
        // print("printing check " + check1[0]);
        // var date3 = DateTime.fromMillisecondsSinceEpoch(
        //     int.parse(check1[0]) * 1000,
        //     isUtc: true);
        // _timefirst = date3.hour.toString() + ":" + date3.minute.toString();
        // print(_timefirst);

        // check2 = config.end_time.split("-").toList();
        // print("printing check " + check2[0]);
        // var date4 = DateTime.fromMillisecondsSinceEpoch(
        //     int.parse(check2[0]) * 1000,
        //     isUtc: true);)

        // print("printintg date time-----");
        // print(dt_start);
        // print(dt_end);

        _timefirst = (config.start_time ~/ 60).toString() + ":";

        if (config.start_time % 60 < 10) _timefirst += '0';
        _timefirst += (config.start_time % 60).toString();


///////////////////////////
        _timesecond = (config.end_time ~/ 60).toString() + ":";

        if (config.end_time % 60 < 10) _timesecond += '0';
        _timesecond += (config.end_time % 60).toString();


        // _timesecond = date4.hour.toString() + ":" + date4.minute.toString();
        // print(_timesecond);
      });

      print(state);

      return config;
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('Failed to load config');
    }
  }

  void _changeSettings() {
    print("change setting button function called");
    String data =
        '{"cam_state":$state,"timefirst":$_timefirst,"timesecond":$_timesecond, "cam_freq":$freq,"album":$album  }';
    print(data);
    // var json = jsonDecode(data);
    // var nameJson = json['name'];
    // String nameString = jsonEncode(nameJson); // jsonEncode != .toString()
    // print(nameString); // outputs {"first":"foo","last":"bar"}

    // cl.publish('coe457/hello', data, null);

    http.post(
      'http://10.0.2.2:3000/config',
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'cam_state': "$state",
        'cam_freq': "$freq",
        'start_time': "$startTime",
        'end_time': "$endTime",
        'album': "$album",
      }),
    );
  }

  void onButtonPressed(BuildContext context) {}

  void onSwitchOnValueChanged(BuildContext context) {}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        constraints: BoxConstraints.expand(),
        decoration: BoxDecoration(
          color: Color.fromARGB(255, 255, 255, 255),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              height: 129,
              margin: EdgeInsets.only(top: 24),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Positioned(
                    left: 0,
                    top: 0,
                    right: 0,
                    child: Opacity(
                      opacity: 0.8,
                      child: Container(
                        height: 129,
                        decoration: BoxDecoration(
                          color: Color.fromARGB(255, 30, 101, 222),
                          border: Border.all(
                            width: 1,
                            color: Color.fromARGB(255, 151, 151, 151),
                          ),
                        ),
                        child: Container(),
                      ),
                    ),
                  ),
                  Positioned(
                    left: 18,
                    top: 50,
                    child: Text(
                      "Settings",
                      textAlign: TextAlign.left,
                      style: TextStyle(
                        color: Color.fromARGB(255, 0, 0, 0),
                        fontFamily: "Helvetica Neue",
                        fontWeight: FontWeight.w700,
                        fontSize: 54,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Align(
              alignment: Alignment.topCenter,
              child: Container(
                width: 294,
                height: 44,
                margin: EdgeInsets.only(top: 23),
                child: FlatButton(
                  onPressed: () => {_changeSettings()},
                  color: Color.fromARGB(255, 75, 132, 229),
                  shape: RoundedRectangleBorder(
                    side: BorderSide(
                      color: Color.fromARGB(0, 0, 0, 0),
                      width: 1,
                      style: BorderStyle.solid,
                    ),
                    borderRadius: BorderRadius.all(Radius.circular(2)),
                  ),
                  textColor: Color.fromARGB(223, 0, 0, 0),
                  padding: EdgeInsets.all(0),
                  child: Text(
                    "Change Settings",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Color.fromARGB(223, 0, 0, 0),
                      fontFamily: "Helvetica Neue",
                      fontWeight: FontWeight.w700,
                      fontSize: 14,
                    ),
                  ),
                ),
              ),
            ),
            Container(
              height: 32,
              margin: EdgeInsets.only(left: 33, top: 20, right: 27),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Align(
                    alignment: Alignment.topLeft,
                    child: Container(
                      margin: EdgeInsets.only(top: 2),
                      child: Text(
                        "Camera On/Off",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Color.fromARGB(223, 0, 0, 0),
                          fontFamily: "Helvetica Neue",
                          fontWeight: FontWeight.w700,
                          fontSize: 20,
                          letterSpacing: 0.71429,
                        ),
                      ),
                    ),
                  ),
                  Spacer(),
                  Align(
                    alignment: Alignment.topLeft,
                    child: Container(
                      width: 52,
                      height: 32,
                      child: Switch(
                        value: state,
                        inactiveTrackColor: Color.fromARGB(60, 0, 0, 0),
                        onChanged: (bool s) {
                          setState(() {
                            state = s;
                          });
                          print(state);
                        },
                        activeColor: Color.fromARGB(255, 184, 184, 184),
                        activeTrackColor: Color.fromARGB(255, 0, 128, 255),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Container(
              height: 24,
              margin: EdgeInsets.only(left: 33, top: 15, right: 33),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Align(
                    alignment: Alignment.topLeft,
                    child: Text(
                      "Camera Timings",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Color.fromARGB(223, 0, 0, 0),
                        fontFamily: "Helvetica Neue",
                        fontWeight: FontWeight.w700,
                        fontSize: 20,
                        letterSpacing: 0.71429,
                      ),
                    ),
                  ),
                  Spacer(),
                  Align(
                    alignment: Alignment.topLeft,
                    child: Container(
                        margin: EdgeInsets.only(top: 7),
                        child: FittedBox(
                          fit: BoxFit.scaleDown,
                          child: Row(
                            children: [
                              FlatButton(
                                child: Text(
                                  _timefirst,
                                  style: TextStyle(fontSize: 30),
                                ),
                                onPressed: () {
                                  _timepicker(context);
                                },
                              ),
                              FlatButton(
                                child: Text(
                                  _timesecond,
                                  style: TextStyle(fontSize: 30),
                                ),
                                onPressed: () {
                                  _timepickersecond(context);
                                },
                              ),
                            ],
                          ),
                        )),
                  ),
                ],
              ),
            ),
            Container(
              height: 24,
              margin: EdgeInsets.only(left: 33, top: 15, right: 33),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Align(
                    alignment: Alignment.topLeft,
                    child: Text(
                      "Camera Frequency(sec)",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Color.fromARGB(223, 0, 0, 0),
                        fontFamily: "Helvetica Neue",
                        fontWeight: FontWeight.w700,
                        fontSize: 20,
                        letterSpacing: 0.71429,
                      ),
                    ),
                  ),
                  Spacer(),
                  Align(
                    alignment: Alignment.topLeft,
                    child: Container(
                      width: 52,
                      height: 32,
                      child: TextField(
                        controller: TextEditingController(text: freq),
                        style: TextStyle(color: Colors.black),
                        onSubmitted: (String str) {
                          print(str);
                          freq = str;
                          print(freq);
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Container(
              height: 24,
              margin: EdgeInsets.only(left: 33, top: 15, right: 33),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Align(
                    alignment: Alignment.topLeft,
                    child: Text(
                      "Spotify Album ID",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Color.fromARGB(223, 0, 0, 0),
                        fontFamily: "Helvetica Neue",
                        fontWeight: FontWeight.w700,
                        fontSize: 20,
                        letterSpacing: 0.71429,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Container(
              height: 24,
              margin: EdgeInsets.only(left: 33, top: 15, right: 33),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Align(
                    alignment: Alignment.topLeft,
                    child: Container(
                      width: 320,
                      height: 32,
                      child: TextField(
                        controller: TextEditingController(text: album),
                        style: TextStyle(color: Colors.green),
                        // decoration: InputDecoration(
                        //   filled: true,
                        //   fillColor: Colors.black,
                        // ),
                        onSubmitted: (String alb) {
                          print(alb);
                          album = alb;
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
