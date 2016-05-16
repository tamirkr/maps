var app = angular.module('app', ['uiGmapgoogle-maps']);

app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        israel: true
    });
});

app.controller('mainCtrl', function($scope) {
    $scope.map = {
        center: {
            latitude: 31.244682,
            longitude: 34.787978
        },
        zoom: 8,
        events: {
            click: function(mapModel, eventName, originalEventArgs) {
                var e = originalEventArgs[0];
                console.log(originalEventArgs);
                createMarker(e.latLng.lat(), e.latLng.lng())
            }
        },
    };
    $scope.markers = [];
    function createMarker(lat, lng) {
        var marker = {
            id: $scope.markers.length + 1,
            coords: {
                latitude: lat,
                longitude: lng,
            },


            options: { draggable: false },
            events: {
                click : function( marker, eventName, args ) {
                    console.log(marker);
                    var lat = marker.getPosition().lat();
                    var lon = marker.getPosition().lng();
                    marker.options = {
                        draggable: false,
                        labelContent: "lat: " + lat + ' ' + 'lon: ' + lon,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                    };
                }
            }
        };
        console.log(marker)
        $scope.$apply(function() {
            $scope.markers.push(marker);
        });

    }

    $scope.deleteMarker = function(index) {
        $scope.markers.splice(index, 1);
    }
});