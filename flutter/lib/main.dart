/*
*  main.dart
*  candidCam
*
*  Created by SK.
*  Copyright © 2018 JSD. All rights reserved.
    */

import 'package:candid_cam/home_screen_widget/home_screen_widget.dart';
import 'package:candid_cam/tab_group_four_tab_bar_widget/tab_group_four_tab_bar_widget.dart';
import 'package:flutter/material.dart';
import 'package:mqtt_client/mqtt_client.dart';
import 'package:mqtt_client/mqtt_server_client.dart';
import 'package:candid_cam/mqtt.dart';

void main() async {
  runApp(App());
  // void _onMessage(String topic, String payload) {
  //   print("Subscribe works");
  //   print('my own onMessage' + topic + ':' + payload);
  // }

  // MQTTClient cl = new MQTTClient('10.0.2.2', '1883', _onMessage);
  // await cl.connect();

  // cl.subscribe('coe457/hello', null);
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // home:
      initialRoute: "/",
      routes: {
        '/': (ctx) => TabGroupFourTabBarWidget(),
        //  HomeScreenWidget.routName:(ctx)=>HomeScreenWidget(),
      },
    );
  }
}
