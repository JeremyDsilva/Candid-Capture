import 'dart:convert';

import 'dart:io';

Dog dogFromJson(String str) => Dog.fromJson(json.decode(str));

// String dogToJson(Dog data) => json.encode(data.toJson());

class Dog {
  Dog({
    this.message,
    this.status,
  });

  final List<String> message;
  final String status;

  factory Dog.fromJson(Map<String, dynamic> json) => Dog(
        message: List<String>.from(json["message"]
            .map((x) => x.toString().replaceAll('localHost', '10.0.2.2'))),
        status: json["status"],
      );

  // Map<String, dynamic> toJson() => {
  //       "message": List<dynamic>.from(message
  //           .map((x) => x.toString().replaceAll('localHost', '10.0.2.2'))),
  //       "status": status,
  //     };
}


// {
//     "_id": "5fd6061b7d4bba5d9e15534b",
//     "cam_state": true,
//     "cam_freq": 10,
//     "start_time": "1970-01-01T00:00:32.400Z",
//     "end_time": "1970-01-01T00:00:48.000Z",
//     "album": "spotify:playlist:37i9dQZF1DX3rxVfibe1L0",
//     "__v": 0
// }

class Config {
  final bool cam_state;
  final int cam_freq;
  final int start_time;
  final int end_time;
  final String album;
  

  Config({this.cam_state, this.cam_freq, this.start_time, this.end_time, this.album});

  factory Config.fromJson(Map<String, dynamic> json) {
    return Config(
      cam_state: json['cam_state'],
      cam_freq: json['cam_freq'],
      start_time: json['start_time'],
      end_time: json['end_time'],
      album: json['album'],
    );
  }
}
