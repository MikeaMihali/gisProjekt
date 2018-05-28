//Tirana cordinates : 41.3275° N, 19.8187°


var center = {lat: 41.3298, lng: 19.8188};

var mapOptions=  {
    zoom: 13,
    center: center
  }
  var flightPlanCoordinates = [
    {lat: 41.3298, lng: 19.8188}
  ];

  var PlanCoordinates = [
    {lat: 41.3298, lng: 19.8188}
  ];
  var nrofclick=0;
  var content = `
  <div id="content">
	  <img src="tih.jpg" width="315px" height="200px" class="img">
	  <div class="row">
		<h5 class="col-xs-4"> Name :</h5>
		<span class="content-title col-xs-8">Tirana International Hotel </span>
	  </div>
	  <div class="row">
		<h5 class="col-xs-4">Adresa :</h5>
		<span class="contet-address col-xs-8">Scanderbeg Square Nr.8, Sheshi Skenderbej Nr.8, Tiranë</span>
	  </div>
	  <div class="row">
		<h5 class="col-xs-4">Telefoni:</h5>
		<span class="contet-address col-xs-8">04 223 4185<span>
	  </div>
  </div>
  `

function initMap() {
    var map = new google.maps.Map(document.getElementById("map"),mapOptions);
    var marker = new google.maps.Marker({
      position: center,
      map: map,
      title:`Tirana International Hotel`
    });

    var infowindow = new google.maps.InfoWindow({
          content:content
        });
      
      google.maps.event.addListener(marker, 'click', function() {
        if(!marker.open){
            infowindow.open(map,marker);
            marker.open = true;
        }
        else{
            infowindow.close();
            marker.open = false;
        }
        google.maps.event.addListener(map, 'click', function() {
            infowindow.close();
            marker.open = false;
        });
        $("#show-controller").next("div").remove();
          $("#show-controller").after(content);
      });	


var rectangle = new google.maps.Rectangle();

      google.maps.event.addListener(map,'click',function(event){
          // *****Kerkesa Nje*****
          flightPlanCoordinates.push(event.latLng); console.log(event.latLng.lat);
          var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: 'yellow',
          strokeOpacity: 1.0,
          strokeWeight: 1.5
        });

      // ***Kerkesa Katert***
        google.maps.event.addListener(flightPath,'click' ,function(event){
              nrofclick++;
              var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: event.latLng,
                radius: 100*nrofclick
              });
      });
      rectangle.setMap(null);

      //***** Kerkesa Tre******/
      var bounds = new google.maps.LatLngBounds(flightPlanCoordinates[flightPlanCoordinates.length-1],flightPlanCoordinates[0]); 
      rectangle = new google.maps.Rectangle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        bounds:bounds
      });
      flightPath.setMap(map);
    });


    // ****** Kerkesa Dy *****
    var flight=new google.maps.Polygon();  
    google.maps.event.addListener(map,'rightclick',function(event){
      if(PlanCoordinates.length>4){
          PlanCoordinates.shift();
          PlanCoordinates.push(event.latLng);
      }
      else
      PlanCoordinates.push(event.latLng);

      flight.setMap(null); 
      flight =new google.maps.Polygon({
        paths: PlanCoordinates,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });
      flight.setMap(map);
  });

  
}
      
  $(document).ready(function(){
				 $("#arrow").click(function(){
					 $("#info-div").hide(1000);
				  });
				  $("#arrow-next").click(function(){
					 $("#info-div").show(1000);
				  });
				  
				  $("#arrow").click();
      });
      
    
/*
 
 */