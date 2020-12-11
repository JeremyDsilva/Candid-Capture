

var load_date


$(document).ready(function(){
    //date when page loads
    load_date = new Date()
});




// called when the client loses its connection
// client.onConnectionLost = function(responseObject) {
//     if (responseObject.errorCode !== 0) {
//         console.log("onConnectionLost:" + responseObject.errorMessage);
//     }
// }

// called when a message arrives
// client.onMessageArrived = function(message) {

//temp to check
var test = 1607319900000;

console.log('hello')

//first get id
//replace with load_date
$.get("/new_photos_id/"+test, function(data){
    console.log(data);
    //for loop do get request for each id
    for(var i = 0; i < data.length; i++){
     //   IDs.push(data[i]._id)

     fetch("/photo/"+data[i]._id)
  .then(res=>{return res.blob()})
  .then(blob=>{
    var img = URL.createObjectURL(blob);
    // Do whatever with the img
    
    $('#gall').append('<div class="col-md-6 col-lg-4 item"><img class="img-thumbnail img-fluid image"'+
    'src="'+img  +'"></a></div>')
  });
     

}
});



//then for each id get and add photo




// };



// var options = {
//     timeout: 3,
//     onSuccess: function () {
//         console.log("mqtt connected");
//         client.subscribe("location", { qos: 2 });
//     },
//     onFailure: function (message) {
//         console.log("Connection failed: " + message.errorMessage);
//     }
// };

// function init() {
//     client.connect(options);
// }
