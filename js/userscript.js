$(document).ready(function() {
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function startTime() {
        var today = new Date();
        today.setHours(today.getUTCHours() + 1);
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        // add a zero in front of numbers<10
        m = checkTime(m);
        s = checkTime(s);

        document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
        t = setTimeout(function () {
            startTime()
        }, 500);
    }


    function datum() {
        var today = new Date();
        var array = ["January", "February", "March", "April", "May", "June", "Juli", "August", "September", "October", "November", "December"];
        var d = today.getDate();
        var m = today.getMonth();
        var dagArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var w = today.getDay();
        var weekdag = dagArray[w];
        var maand = array[m];
        startTime();
        document.getElementById('dateDate').innerHTML = weekdag;
        document.getElementById('dayDate').innerHTML = d.toString();
        document.getElementById('monthDate').innerHTML = maand;
    }

    startTime();
    datum();

    function getWeatherType(icon) {
        switch (icon) {
            case "01d":
                return "wi wi-day-sunny";
            case "02d":
                return "wi wi-day-sunny-overcast";
            case "03d":
                return "wi wi-day-cloudy";
            case "04d":
                return "wi wi-cloudy";
            case "09d":
                return "wi wi-day-showers";
            case "10d":
                return "wi wi-day-rain";
            case "11d":
                return "wi wi-day-thunderstorm";
            case "13d":
                return "wi wi-day-snow";
            case "50d":
                return "wi wi-fog";

            case "01n":
                return "wi wi-night-clear";
            case "02n":
                return "wi wi-night-alt-partly-cloudy";
            case "03n":
                return "wi wi-night-alt-cloudy";
            case "04n":
                return "wi wi-cloudy";
            case "09n":
                return "wi wi-night-alt-rain-mix";
            case "10n":
                return "wi wi-night-alt-rain";
            case "11n":
                return "wi wi-night-alt-thunderstorm";
            case "13n":
                return "wi wi-night-alt-snow";
            case "50n":
                return "wi wi-fog";

            default:
                return "wi-na";
        }
    }

    function getWeather() {
        fetch('https://api.openweathermap.org/data/2.5/weather?id=2797656&appid=1c69c5ca7aa5fc91df7b97a37ceec6d1')
            .then(function (resp) {
                return resp.json()
            }) // Convert data to json
            .then(function (data) {
                drawWeather(data);
            })
            .catch(function () {
                console.log('Error fetching openweather API data')
            });

    }

    function drawWeather(d) {

        document.getElementById('location').innerHTML = d.name;
        document.getElementById('celsius').innerHTML = Math.round(parseFloat(d.main.temp) - 273.15);
        document.getElementById('sunClouds').className = getWeatherType(d.weather[0].icon);
        document.getElementById('humidity').innerHTML = d.main.humidity;
        document.getElementById('pressure').innerHTML = d.main.pressure;
        document.getElementById('wind').innerHTML = Math.round((d.wind.speed * 3600) / 1000) + 'km/h';

        function transferUnixTime(time) {
            var tempTime = new Date(time * 1000);
            var timeString = tempTime.toUTCString();
            return timeString.slice(-12, -7);
        }

        document.getElementById('sunUp').innerHTML = transferUnixTime(d.sys.sunrise);
        document.getElementById('sunDown').innerHTML = transferUnixTime(d.sys.sunset);
    }

    function getForecast() {
        fetch('https://api.openweathermap.org/data/2.5/forecast?id=2797656&appid=1c69c5ca7aa5fc91df7b97a37ceec6d1')
            .then(function (resp) {
                return resp.json()
            }) // Convert data to json
            .then(function (data) {
                drawForecast(data);
            })
            .catch(function () {
                console.log('Error fetching openweather forecast API data')
            });
    }

    function transferUnixDate(date) {
        var tempDate = new Date(date * 1000);
        var dateString = tempDate.toDateString();
        return dateString.slice(-20, -12);
    }

    function drawForecast(f) {
        var one = -1;
        var two = -1; //+8
        for (var i = 0; i < f.list.length; i++) {
            if (f.list[i].dt_txt.endsWith("15:00:00")) {
                one = i;
                two = i + 8;
                break;
            }
        }
        document.getElementById('forecast_tomorrow_celsius').innerHTML = Math.round(parseFloat(f.list[one].main.temp) - 273.15);
        document.getElementById('forecast_tomorrow_weather').className = getWeatherType(f.list[one].weather[0].icon);
        document.getElementById('forecast_tomorrow_date').innerHTML = transferUnixDate(f.list[one].dt);
        document.getElementById('forecast_dayafter_celsius').innerHTML = Math.round(parseFloat(f.list[two].main.temp) - 273.15);
        document.getElementById('forecast_dayafter_weather').className = getWeatherType(f.list[two].weather[0].icon);
        document.getElementById('forecast_dayafter_date').innerHTML = transferUnixDate(f.list[two].dt);
    }

    getWeather();
    getForecast();

    $(document).ready(function () {

        var $block = $(".block");

        $block.mouseenter(function () {
            if ($(window).width() >= 1200) {
                $(this).children('h1').animate({
                    top: '20%',
                    opacity: '0.5'
                });
                $(this).children('.hidden').fadeIn(400);
            }
        });
        $block.mouseleave(function () {
            if ($(window).width() >= 1200) {
                $(this).children('h1').animate({
                    top: '40%',
                    opacity: '1.0'
                });
                $(this).children('.hidden').fadeOut(500);
            }
        });
    });
});



