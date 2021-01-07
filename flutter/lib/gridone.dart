import 'dart:convert';
import 'dart:io' as io;
import 'dart:io';
import 'dart:typed_data';
import 'dart:ui';
import 'package:candid_cam/values/getting_image_from_api.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_gallery_saver/image_gallery_saver.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;
import "package:image_gallery_saver/image_gallery_saver.dart";
import 'package:dio/dio.dart';
import 'package:permission_handler/permission_handler.dart';
import './tab_group_four_tab_bar_widget/tab_group_four_tab_bar_widget.dart'
    as bottomtab;
import 'package:image_downloader/image_downloader.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:candid_cam/mqtt.dart';

class GridOne extends StatefulWidget {
  @override
  _GridOneState createState() => _GridOneState();
}

class _GridOneState extends State<GridOne> {
  @override
  void initState() {
    date = DateTime.fromMillisecondsSinceEpoch(0);
    _dogimg.clear();
    getApiImages(this.context);
    super.initState();
    date = new DateTime.now().toUtc();
    // initialize MQTT
    if (dl == null) setUpMQTT();
  }

  static MQTTClient dl = null;

  File _image;
  int cnt = 0;
  int checkimage = 0;
  List<String> _dogimg = List<String>();
  final _imgkey = GlobalKey<FormState>();
  Dog getdogimages;
  String data;
  Future<void> downloadimg(BuildContext context, index) async {
    try {
      // Saved with this method.
      // var imageId = await ImageDownloader.downloadImage(_dogimg[index]);
      // print("HAHAHHAHAHA"+index.toString());
      // if (imageId == null) {
      //   return;
      // }

      print("Length of index:" + _dogimg.length.toString());

      print("ENCODED DATA DISPLAYED:" + index);
      http.Response response = await http.get(index);
      // print("Downloaded Image:"+response.body);

      //   Uint8List bytes =  base64.decode(index);
      Directory documentDirectory = await getExternalStorageDirectory();
      //  String fullpath = '$documentDirectory/'+;
      // var filedata = io.File(_dogimg[index]);
      // File newimg = File(fullpath);
      final bytes = response?.bodyBytes;
      File file = new File(join(documentDirectory.path, 'myimg.jpg'));

      file.writeAsBytesSync(bytes);
      print(file);

      final result = await ImageGallerySaver.saveImage(bytes);

      //return result;
      // Below is a method of obtaining saved image information.
      // var fileName = await ImageDownloader.findName(imageId);
      // var path = await ImageDownloader.findPath(imageId);
      // var size = await ImageDownloader.findByteSize(imageId);
      // var mimeType = await ImageDownloader.findMimeType(imageId);

    } on PlatformException catch (error) {
      print(error);
    }
  }

  Future<String> networkImageToBase64(String imageUrl) async {
    http.Response response = await http.get(imageUrl);
    // print("Downloaded Image:"+response.body);
    final bytes = response?.bodyBytes;
    return (bytes != null ? base64Encode(bytes) : null);
  }

  void getApiImages(BuildContext context) async {
    await selectImageFromApi(context);
    for (int i = 0; i < getdogimages.message.length; i++) {
      _dogimg.add(getdogimages.message[i]);
    }

    if (_dogimg.length > 0) {
      setState(() {
        print("Length of dogIMAGE:" + _dogimg.length.toString());
      });
    }
  }

  DateTime date;
  void _onMessage(String topic, String payload) async {
    print('my own onMessage' + topic + ':' + payload);
    //call api refreshed
    print("date inside onMessage BEFORE" + date.toString());
    await getApiImages(this.context);

    print("date inside onMessage AFTER" + date.toString());
  }

  void setUpMQTT() async {
    // create an MQTT client.
    dl = new MQTTClient('10.0.2.2', '1883', _onMessage);
    await dl.connect();
    dl.subscribe('candid', null);
  }

  Future<Dog> selectImageFromApi(BuildContext context) async {
    print(date.millisecondsSinceEpoch);
    String url =
        "http://10.0.2.2:3000/image/date/${((date.millisecondsSinceEpoch) / 1000).toInt()}";
    date = new DateTime.now().toUtc();
    try {
      final responce = await http.get(url);
      print(responce.body);
      //  final fetchRegUserData = json.decode(responce.body) as Map<String, dynamic>;

      if (responce.statusCode == 200 && responce.body != null) {
        print("Success200Code");
        //  var getdataa = json.decode();
        getdogimages = await dogFromJson(responce.body);

        //   for(var data in getimage){
        //  getdogimages.add((data));
        //
        // }

        print("HAHAHAHA:" + getdogimages.status);
        //  data = getdogimages.message;
        // _dogimg.add(getdogimages.message[0]);
        // print("LENGTH OFFF DOG IMAGES:"+ _dogimg.length.toString());
        return getdogimages;
      } else {
        _dogimg.clear();
        return null;
      }

      //    print(username);
    } catch (ex) {
      print(ex.toString());
      print("Exception");
    }

    //  print(username);
  }

  Future _getImage() async {
    var img = await ImagePicker.pickImage(
        source: ImageSource.gallery, maxWidth: 200.0, maxHeight: 300.0);

    setState(() {
      _image = img;
    });
//   if(_image != null){
//     // imageRequiredAlert(ctx);
//     setState(() {
//
//     });
//     // return;
//   }
//   print(_image);
  }

  @override
  Widget build(BuildContext context) {
    // CircularProgressIndicator();
    return Column(
      children: [
        Container(
          width: double.infinity,
          height: MediaQuery.of(context).size.height / 0.5,
          // child: FutureBuilder<Dog>(
          //   future: selectImageFromApi(context),
          //   builder: (context,snapshot){
          //      if(snapshot.hasData){
          //        return GridView.count(
          //            crossAxisCount: 3,
          //            childAspectRatio: 1.0,
          //           shrinkWrap: true,
          //           physics: ScrollPhysics(),
          //        children: List.generate(snapshot.data.message.length, (index) {
          //            return Container(
          //              child: Image.network(snapshot.data.message),
          //            );
          //          })
          //        ,
          //        );
          //      }else{
          //        return Container();
          //      }
          //   },
          // ),

          child: GridView.count(
            key: _imgkey,
            crossAxisCount: 3,
            childAspectRatio: 1.0,
            shrinkWrap: true,
            physics: ScrollPhysics(),
            // scrollDirection: Axis.vertical,
            children: List.generate(_dogimg.length, (index) {
              return GestureDetector(
                onTap: () {
                  Scaffold.of(context)
                      .showSnackBar(SnackBar(content: Text(index.toString())));
                  //  print("ACTUAL IMAGE NAMEEEEEEEEE:" + getdogimages.message);
                  downloadimg(context, _dogimg[index]);
                },
                child: Stack(
                  children: [
                    Container(
                      child: Card(
                        elevation: 10.0,
                        child: Align(
                          alignment: Alignment.center,
                          child: Image.network(_dogimg[index]),
                          //  child: _image ==null?getdogimages.status :Image.file((_image)),
                          //   child: FutureBuilder<Dog>(
                          //     future: selectImageFromApi(context),
                          //     builder: (context,AsyncSnapshot<Dog> snapshot){
                          //       if(snapshot.hasData) {
                          //        if(cnt==0 ||cnt==30){
                          //          _dogimg.clear();
                          //
                          //        }
                          //        cnt++;
                          //         networkImageToBase64(snapshot.data.message).then((value) =>_dogimg.add(value),);
                          //
                          //
                          //         //print("Snap shot DATA"+getdogimages.message[index]);
                          //
                          //         return  Column(
                          //           children: [
                          //             Image.network(snapshot.data.message),
                          //           ],
                          //         );
                          //       }else{
                          //       _dogimg.clear();
                          //
                          //         return  CircularProgressIndicator();
                          //
                          //       }
                          //     },
                          //   )
                        ),
                      ),
                    ),
                    Container(
                      child:
                          Image.asset("assets/images/newimgtag.jpg", width: 30),
                      margin: EdgeInsets.only(top: 5, left: 5),
                    ),
                  ],
                ),
              );
            }),
          ),
        ),
        // Container(
        //   width: double.infinity,
        //   height: 200,
        //  // child: bottomtab.TabGroupFourTabBarWidget(),
        // ),
      ],
    );
  }
}
