// To interact with UDP on node
const dgram = require('dgram');
//wait a certain amout of time.
const wait = require('waait');

const commandDelays = require('./commandDelays');

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
const server = app.listen(1337);
const io = require('socket.io')(server);
app.set('view engine', 'ejs');


io.on('connection', function (socket) { //2
    socket.emit('greeting', {msg: 'Greetings, from server Node, brought to you by Sockets! -Server'}); //3
    socket.on('thankyou', function (data) { //7
        console.log(data.msg); //8 (note: this log will be on your server's terminal)
    });

    socket.on('testing', function (data) {
        console.log(data.msg);
    });
    
    socket.on('takeoff', function (data) {
        console.log(data.msg);
        takeoff();
    });

    socket.on('land', function (data) {
        console.log(data.msg);
        land();
    });

    socket.on('up', function (data) {
        console.log(data.msg);
        up();
    });

    socket.on('flip', function (data) {
        console.log(data.msg);
        flip();
    });
    socket.on('stream', function (data) {
        console.log(data.msg);
        streamon();
    });

    socket.on('streamoff', function (data) {
        console.log(data.msg);
        streamoff();
    });





});




//**********************************************************************************************************************

//refer to Tello SDK
const PORT = 8889;
const HOST = '192.168.10.1';
// require("dronestream").listen(server, { ip: "192.168.10.1" });

//creating a socket via udp4
const drone = dgram.createSocket('udp4');
drone.bind(PORT);

const droneStream = dgram.createSocket('udp4')
droneStream.bind(11111);

droneStream.on('message', message => {
    console.log(`msg: ${message}`)
});


drone.on('message', message => {
    console.log(`msg : ${message}`)
});

function handleError(err){
    if(err){
        console.log('Error');
        console.log(err);
    }
}

drone.send('command', 0, 7, PORT, HOST, handleError);

function takeoff(){
    drone.send('takeoff', 0, 7, PORT, HOST, handleError);
    console.log("Taking off");
}

function land() {
    drone.send('land', 0, 4, PORT, HOST, handleError);
    console.log("LANDING");
}

function up() {
    drone.send('up 20', 0, 5, PORT, HOST, handleError);
    console.log("up 20 cm");
}
function flip() {
    drone.send('flip b', 0, 6, PORT, HOST, handleError);
    console.log("flipping");
}
function streamon() {
    drone.send('streamon', 0, 8, PORT, HOST, handleError);

}
function streamoff() {
    drone.send('streamoff', 0, 9, PORT, HOST, handleError);
    console.log("streamoff");
}






// drone.send('command', 0, '7', PORT, HOST, handleError);
// drone.send('battery?', 0, '8', PORT, HOST, handleError);

// const commands = ['command', 'battery?', 'takeoff', 'land'];
// let i = 0;

// async function go() {
//     const command = commands[i];
//     const delay = commandDelays[command];
//     console.log(`running command: ${command}`);
//     drone.send(command, 0, command.length, PORT, HOST, handleError);
//     await wait(delay);
//     i += 1;
//     if (i < commands.length){
//         return go();
//     }
//     console.log('done');
// }

// go();

//**********************************************************************************************************************











//--------------------------------- URLS ------------------------------------
app.get('/', function(req, res) {
    res.render("index");

});