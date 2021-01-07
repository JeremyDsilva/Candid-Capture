/*
*  shadows.dart
*  candidCam
*
*  Created by SK.
*  Copyright © 2018 JSD. All rights reserved.
    */

import 'package:flutter/rendering.dart';


class Shadows {
  static const BoxShadow primaryShadow = BoxShadow(
    color: Color.fromARGB(128, 121, 121, 121),
    offset: Offset(0, 2),
    blurRadius: 10,
  );
  static const BoxShadow secondaryShadow = BoxShadow(
    color: Color.fromARGB(62, 0, 0, 0),
    offset: Offset(0, 2),
    blurRadius: 2,
  );
}