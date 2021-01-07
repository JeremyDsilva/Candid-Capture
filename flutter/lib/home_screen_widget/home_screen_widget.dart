/*
*  home_screen_widget.dart
*  candidCam
*
*  Created by SK.
*  Copyright . All rights reserved.
    */

import 'package:candid_cam/tab_group_four_tab_bar_widget/tab_group_four_tab_bar_widget.dart';
import 'package:candid_cam/values/values.dart';
import 'package:flutter/material.dart';
import 'package:candid_cam/gridone.dart' as gridone;

class HomeScreenWidget extends StatelessWidget {
  static final routName="/Home";



  @override
  Widget build(BuildContext context) {
    return Scaffold(
     //bottomNavigationBar:TabGroupFourTabBarWidget(),
      body: Container(
        constraints: BoxConstraints.expand(),
        decoration: BoxDecoration(
          color: Color.fromARGB(255, 255, 255, 255),
        ),


            child: SingleChildScrollView(
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
                            opacity: 0.79827,
                            child: Container(
                              height: 129,
                              decoration: BoxDecoration(
                                color: Color.fromARGB(255, 30, 102, 222),
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
                            "Photos",
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
                 Container(
                     width: double.infinity,
                     height:MediaQuery.of(context).size.height/0.4,
                     child: gridone.GridOne(),

                     )

                        /*GridView.count(crossAxisCount: 3)
                      children: List.generate(30, (index) => null)

                      height: 356,
                      margin: EdgeInsets.only(left: 4, top: 37, right: 3),
                      child: GridView.builder(
                        gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
                          maxCrossAxisExtent: 353,
                          childAspectRatio: 0.99157,
                          mainAxisSpacing: 10,
                        ),
                      ),
                    */

                   //notthis
                ],
              ),
            ),


      ),
    );
  }
}
