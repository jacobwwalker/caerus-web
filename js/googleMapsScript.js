var geocoder;
var map;
var circle;
function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(54,-2),
		zoom: 6,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
}
function addPin() {
	var pin = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(54,-2),
		draggable: true,
	});
}
google.maps.event.addDomListener(window, "load", initialize);
var pinColour = "#e74c3c"
//Add pin to map
function codeAddress(pinColour) {
	var customIcon
	switch (document.getElementById("filter").value) {
		case "clothing":
			if (pinColour == "#e74c3c") {
				customIcon = "img/redTeePin.svg";
			}
			else if (pinColour == "#2980b9") {
				customIcon = "img/blueTeePin.svg";
			};
		break;
		case "computers":
			if (pinColour == "#e74c3c") {
				customIcon = "img/redComputerPin.svg";
			}
			else if (pinColour == "#2980b9") {
				customIcon = "img/blueComputerPin.svg";
			};
		break;
		case "mobilePhones":
			if (pinColour == "#e74c3c") {
				customIcon = "img/redPhonePin.svg";
			}
			else if (pinColour == "#2980b9") {
				customIcon = "img/bluePhonePin.svg";
			};
		break;
		case "null":
			if (pinColour == "#e74c3c") {
				customIcon = "img/redPin.svg";
			}
			else if (pinColour == "#2980b9") {
				customIcon = "img/bluePin.svg";
			};
		break;
	}
	var address = document.getElementById("address").value;
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode( { "address": address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			var pin = {
			url:customIcon,
			scaledSize: new google.maps.Size(20,34.09,"px","px")
			}
			window.marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location,
				draggable: true,
				icon: pin
			});
			circle = new google.maps.Circle({
				map: map,
				fillColor:pinColour,
				fillOpacity:0.5,
				strokeColor:pinColour,
				center: window.marker.getPosition(),
				radius: parseInt(document.getElementById("circleRadius").value)
			});
			circle.bindTo("center",marker,"position");
		}
		else if (status = "ZERO_RESULTS") {
			alert("Please enter an address or postcode to place the pin");
		}
		else {
		alert("Geocode was not successful for the following reason: " + status);
		}
	});
}