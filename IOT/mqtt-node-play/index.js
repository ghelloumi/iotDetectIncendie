var app = require('express')();

var mqtt = require('mqtt')  
var broker = 'mqtt://192.168.1.8:1883';  
var client = mqtt.connect(broker);  

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

  
client.subscribe('iot');  

var mqttres = [
   {
       id : 0,
       msg : "",
   }
];

client.handleMessage = function(packet, done) {
	app.get('/m', function (req, res) {
		mqttres[0].msg=packet.payload.toString()
		res.send({mqttres});
	});  
   console.log();  
   done();  
}  






app.put('/mqttres', (req, res) => {
    
    res.send({users});
});


var server = app.listen(3000);



