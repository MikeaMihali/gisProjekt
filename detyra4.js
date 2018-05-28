/*
 Deklarojm variablat kryesore:
 qendren e cdo rrethi dhe rrezen perkatse
 caktojm zoom dhe centerin e hartes
 variablat ndihmese per te gjetuar rrugen edhe dalluar klikimet
**/
var rreth1center={lat:41.878,lng:-87.629};
var rreth1rreze=50;
var rreth2center={lat:40.714,lng:-74.005};
var rreth2rreze=40;
var rreth3center= {lat: 34.052, lng: -118.243};
var rreth3rreze=30;
var center = {lat: 37.09, lng: -95.712};
var mapOptions={
    center:center,
    zoom:5
};
var start=0;
var end=0;
var click=0;
var circleclicked;
function initMap(){
    /*
    Ne fillim te funksionit initMap inicializojm harten qe do shfaqe dhe sherbimet
    kryesore qe do perdorim DirectionsService DirectionsRenderer dhe ReverseGeocoding
    **/
    var map=new google.maps.Map(document.getElementById("map"),mapOptions);
    var directionDisplay= new google.maps.DirectionsRenderer;
    var directionService=new google.maps.DirectionsService;
    var geocoder = new google.maps.Geocoder;
    directionDisplay.setMap(map);
    // Vizatojm 3 rrethat
    var rreth1=new google.maps.Circle({
                strokeColor: '#ffffff',
                strokeOpacity: 1,
                strokeWeight: 2,
                fillColor: '##8383fc',
                fillOpacity: 0.35,
                map: map,
                center:rreth1center,
                radius:rreth1rreze*10000
    });
    var rreth2=new google.maps.Circle({
        strokeColor: '#ffffff',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '##8383fc',
        fillOpacity: 0.35,
        map: map,
        center:rreth2center,
        radius:rreth2rreze*10000
    });
    var rreth3=new google.maps.Circle({
    strokeColor: '#ffffff',
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor: '##8383fc',
    fillOpacity: 0.35,
    map: map,
    center:rreth3center,
    radius:rreth3rreze*10000
    });
    // Shtojm rrethat ne nje array per te pasur me te leht shtimin e listenerve
    let rretharray=[];
    rretharray.push(rreth1);
    rretharray.push(rreth2);
    rretharray.push(rreth3);
    // Per cdo rreth shtojm nje listener
    rretharray.forEach(el=>{
        google.maps.event.addListener(el,'click',function(event){
            // Nqs kemi klikuar mbi rrethin e dyt inicializojm markerin dhe infowindow
            if(rretharray.indexOf(el)===1){
                var infowindow=new google.maps.InfoWindow;
                var marker=new google.maps.Marker;
                // Therasim funksionin per te perdorur reverve geocoding dhe perte shfaqur marker
                reverseGeocoding(geocoder,marker,infowindow,event);
            }
            // Numerojm klikimet
            click++;
            // Nqs jemi ne klikim te dyt te nje rrethi te ndryshem therasim funks
            // edhe restartojm variablat
            if(click===2&&circleclicked!=rretharray.indexOf(el)){
                end=el.getCenter();
                findAndDisplayRoute(directionService,directionDisplay);
                end=0;
                start=0;
                click=0;
            }
            // Per ndryshe ky esht klikim i pare dhe ruajm vtm origjinen
            else {
                click=1;
                circleclicked=rretharray.indexOf(el);
                start=el.getCenter();
            }
        })
    });
    // Funksioni qe gjen dhe shfaq rrugen
    function findAndDisplayRoute(directionService,directionDisplay){
        directionService.route({
            origin:start,
            destination:end,
            travelMode:'DRIVING'
        },function(response,status){
            if(status=== 'OK'){
                directionDisplay.setDirections(response);
            }
            else
                 window.alert('Directions request failed due to ' + status);
        });
    }
    // Reverse geocoding plus shfaqja e markert dhe infowindow ne event klikim
    function reverseGeocoding(geocoder,marker,infowindow,event){
        geocoder.geocode({'location':event.latLng},function(response,status){
            if(status==='OK'){
                if(response[0]){
                    // shtojm markerin
                    marker=new google.maps.Marker({
                        position:event.latLng,
                        map:map
                    });
                // shtojm nje listener per te thapur infowindow
                marker.addListener('click',function(){
                    if(!marker.open){
                        infowindow.open(map,marker);
                        marker.open = true;
                    }
                    else{
                        infowindow.close();
                        marker.open = false;
                    }
                });
                // perdoreim response e geocoder per te treguar addresen
                infowindow.setContent(response[0].formatted_address+" coordinates:"+event.latLng);
                }
                else 
                    window.alert("No results found");
            } 
             else
                window.alert('Geocoder failed due to: ' + status);
        });
    }
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