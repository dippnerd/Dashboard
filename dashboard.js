var express = require('express');
var path = require('path');
var app = express();
var exphbs = require('express-handlebars'); app.engine('handlebars',
exphbs({defaultLayout: 'main'})); app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 5678);
var options = { dotfiles: 'ignore', etag: false,
extensions: ['htm', 'html'],
index: false
};
app.use(express.static(path.join(__dirname, 'public') , options  ));

app.get('/', function(req, res)
{
  // Weather
  var Forecast = require('forecast');
  var forecast = new Forecast({
    service: 'forecast.io',
    key: '******',
    units: 'f', // Only the first letter is parsed
    cache: true,      // Cache API requests?
    ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
        minutes: 15
      }
  });
  forecast.get([X, Y], function(err, weather) {
    if(err) return console.dir(err);
    /*day1 = {
      icon:weather.daily.data[1].icon,
      time:timeConverter(weather.daily.data[1].time).day,
      high:Math.round(weather.daily.data[1].temperatureMax),
      low:Math.round(weather.daily.data[1].temperatureMin),
      rain:(weather.daily.data[1].precipProbability)*100
    }*/

    var days = [];
    for (var i=1; i<7; i++) {
        days[i] = {
          count:i,
          icon:weather.daily.data[i].icon,
          time:timeConverter(weather.daily.data[i].time).day,
          high:Math.round(weather.daily.data[i].temperatureMax),
          low:Math.round(weather.daily.data[i].temperatureMin),
          rain:Math.round(weather.daily.data[i].precipProbability*100),
          chance:((weather.daily.data[i].precipProbability)>0.12) ? 1 : 0
        };
    }
    var sunrise = timeConverter(weather.daily.data[0].sunriseTime);
    var sunset = timeConverter(weather.daily.data[0].sunsetTime);
    var current = {
      temp: Math.round(weather.currently.temperature),
      high: Math.round(weather.daily.data[0].temperatureMax),
      low: Math.round(weather.daily.data[0].temperatureMin),
      bearing: weather.currently.windBearing,
      windspeed: Math.round(weather.currently.windSpeed),
      rain: Math.round(weather.currently.precipProbability*100),
      chance: ((weather.currently.precipProbability)>0.12) ? 1 : 0,
      humidity: Math.round(weather.currently.humidity*100),
      sunrise: sunrise.hour + ":" + sunrise.min,
      sunset: sunset.hour + ":" + sunset.min
    }


    res.render('weather', {
        current_date: current_date(),
        current: current,
        weather: weather,
        today: weather.daily.data[0],
        days: days,
        weather_active: " active"
      });   // this is the important part
  });

  //console.dir(weather);
});
// End Weather


app.get('/music', function(req, res)
{
res.render('music', { music_active: " active" });
});
app.get('/lights', function(req, res)
{
res.render('lights', { lights_active: " active" });
});
app.get('/devices', function(req, res)
{
res.render('devices', { devices_active: " active" });
});
app.get('/events', function(req, res)
{
res.render('events', { events_active: " active" });
});
app.get('/scenes/wake_up', function(req, res)
{
/*trigger scene*/
});
app.get('/scenes/leaving', function(req, res)
{
/*trigger scene*/
});
app.get('/scenes/bedtime', function(req, res)
{
/*trigger scene*/
});


app.listen(app.get('port'),  function () {
console.log('started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});


function current_date() {
  var d = new Date();
  var weekday = new Array(7);
  weekday[0]=  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var day = weekday[d.getDay()]; //day name
  var date = d.getDate(); //day number
  var month = months[d.getMonth()];//number
  return fulldate = day + ", " + month + " " + date;
}

function current_time() {
  var d = new Date();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var day = days[a.getDay()];
  var hour = a.getHours();
  var min = a.getMinutes()<10 ? "0" + a.getMinutes() : a.getMinutes();
  var sec = a.getSeconds();
  var time = {date:date,year:year,month:month,hour:hour,min:min,sec:sec,day:day} ;
  return time;
}
