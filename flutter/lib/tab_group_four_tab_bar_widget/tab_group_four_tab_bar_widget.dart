/*
*  tab_group_four_tab_bar_widget.dart
*  candidCam
*
*  Created by SK.
*  Copyright . All rights reserved.
    */
import 'dart:convert';
import '../home_screen_widget/home_screen_widget.dart' as home;
import '../settings_screen_widget/settings_screen_widget.dart' as setting;
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class TabGroupFourTabBarWidget extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _TabGroupFourTabBarWidgetState();
}

class _TabGroupFourTabBarWidgetState extends State<TabGroupFourTabBarWidget> {
  int bottonNavIndex = 0;
  final List<Map<String, Object>> classesList = [
    {"page": home.HomeScreenWidget(), "title": "Home"},
    {
      "page": setting.SettingsScreenWidget(),
      "title": "Setting",
    },
  ];
  void selectedBottonNav(int index) {
    setState(() {
      bottonNavIndex = index;

      //classesList[bottonNavIndex];
    });
  }






  //void _onTabChanged(int index) => this.setState(() => _currentIndex = index);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: classesList[bottonNavIndex]["page"],
      bottomNavigationBar: BottomNavigationBar(
        //fixedColor: Color.fromARGB(255, 0, 0, 0),
        selectedItemColor: Color.fromARGB(255, 0, 0, 0),

        currentIndex: bottonNavIndex,

        onTap: selectedBottonNav,
        items: [
          BottomNavigationBarItem(
            icon: Icon(
              Icons.home,
              size: 32,
            ),
            title: Text(
              "Home",
              textAlign: TextAlign.left,
              style: TextStyle(
                //       color: Color.fromARGB(255, 0, 0, 0),
                fontWeight: FontWeight.w400,
                fontSize: 12,
              ),
            ),
          ),
          BottomNavigationBarItem(
            icon: Image.asset(
              "assets/images/shape-4.png",
              width: 32,
              height: 32,
            ),
            title: Text(
              "Settings",
              textAlign: TextAlign.left,
              style: TextStyle(
                color: Color.fromARGB(255, 0, 0, 0),
                fontWeight: FontWeight.w400,
                fontSize: 12,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
