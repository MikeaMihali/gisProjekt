
var center = {lat: 41.3190, lng: 19.8188};
var mapOptions={
      center:center,
      zoom:15
  };
function initMap(){
    var map=new google.maps.Map(document.getElementById("map"),mapOptions);
    downloadUrl('http://localhost/gis.php',function(data){
    var xml = data.responseXML;
    var hotels = xml.documentElement.getElementsByTagName('hotel');
    Array.prototype.forEach.call(hotels,function(hotel){
        var id=hotel.getAttribute('id');
        var name=hotel.getAttribute('name');
        var value=hotel.getAttribute('value');
        var point=new google.maps.LatLng(
            parseFloat(hotel.getAttribute('lat')),
            parseFloat(hotel.getAttribute('lng'))
        );
        console.log(point);
        var marker = new google.maps.Circle({
            strokeColor: '#ffffff',
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: '##8383fc',
            fillOpacity: 0.35,
            map: map,
            center:point,
            radius:parseFloat(value)
          });
          var infowindow=new google.maps.InfoWindow;
          infowindow.setContent("Name :"+name+"\n"+"value :"+value);
          infowindow.setPosition(point);
          infowindow.open(map);
    })
    })
}
/*
funksioni per te bere requestin 
**/
function downloadUrl(url, callback) {
    var request = window.ActiveXObject ?
        new ActiveXObject('Microsoft.XMLHTTP') :
        new XMLHttpRequest;

    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        request.onreadystatechange = doNothing;
        callback(request, request.status);
      }
    };

    request.open('GET', url, true);
    request.send(null);
  }
function doNothing() {}
$(document).ready(function(){
    $("#arrow").click(function(){
        $("#info-div").hide(1000);
     });
     $("#arrow-next").click(function(){
        $("#info-div").show(1000);
     });
     
     $("#arrow").click();
});