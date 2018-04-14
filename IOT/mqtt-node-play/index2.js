var mqtt = require('mqtt')  
var broker = 'mqtt://192.168.1.8:1883';  
var client = mqtt.connect(broker);  
  
client.subscribe('iot');  
client.handleMessage = function(packet, done) {  
   console.log(packet.payload.toString());  
   done();  
}  
