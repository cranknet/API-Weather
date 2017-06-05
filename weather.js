
var ipURL  = "http://ip-api.com/json";
// Get IP Info from IP-API.com
function getIPInfo() {
    $.ajax({
        type: 'GET',
        url: ipURL,
        dataType: 'jsonp',
        beforeSend: function () {
          $(".spinner").fadeIn(2000);
        },
        success: function (iPDATA) {
            //console.log(iPDATA);
            var Longitude = iPDATA.lon;
            var Latitude = iPDATA.lat;
            var weatherURL = "https://api.darksky.net/forecast/1c5a660a1db62d4d3a423f21f1ae089b/"+ Latitude + "," + Longitude + "?exclude=hourly,daily,flags";
            getWeather(weatherURL);
            $(".info").fadeIn(2000).html(iPDATA.city + ", " + iPDATA.country);
            $(".spinner").fadeOut(1000);

        }
    });
}

function getWeather(URL) {
    $.ajax({
       type: 'GET',
        url: URL,
        dataType: 'jsonp',
        success: function (wDATA) {
            //console.log(wDATA);
            // Start Forcast Icons Canvas
            var wICON = new Skycons();
            wICON.add("weatherICON", wDATA.currently.icon);
            wICON.play();
            ////////////////////////////////////////////////////
            $(".pressure span").fadeIn(2000).html(wDATA.currently.pressure);
            $(".humidity span").fadeIn(2000).html(wDATA.currently.humidity);
            $(".visibility span").fadeIn(2000).html(wDATA.currently.visibility);
            $(".windspeed span").fadeIn(2000).html(wDATA.currently.windSpeed);
            $(".temperature").fadeIn(2000).html(wDATA.currently.summary + "   <span class='temp badge'>" + wDATA.currently.temperature + " F</span>");
            var temp =  wDATA.currently.temperature;
            changeCF(temp);
        }


    });
}

///////////////////////////


    function changeCF(temp) {
        function setCelsius() {
            var cel = (temp - 32) * 5/9;
            return cel;
        }
        function setFahrenheit() {
            return temp;
        }

        $('#tm').on("click", function () {
            tm = $("#tm");
            if(tm.val() == "C"){
                $(tm).html("Fahrenheit").val("F");
                $(".temp").html(setFahrenheit() + " F");
            } else{
                $(tm).html("Celsius").val("C");
                $(".temp").html(setCelsius() + " C");
            }
        });
    }

// Initiate jQuery //

$(document).ready(function(){
    getIPInfo();
});