<script>

    var gps_coord = {latitude: 0, longitude: 0};
    function get_gps_coord() {
        clearTimeout(gps_timeout);
        gps_timeout = 0;
        if((window.location.origin == 'http://localhost' || window.location.protocol == 'https:') && 'geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log('Latitude : ' + position.coords.latitude);
                console.log('Longitude : ' + position.coords.longitude);
                console.log("Position : " + position);
            }, function(error) {
                console.log(error);
            });
        } else {
            console.log("Error");
        }
        gps_timeout = setTimeout(get_gps_coord, gps_interval);
    }
</script>