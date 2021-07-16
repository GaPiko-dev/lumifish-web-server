//sudo systemctl stop dnsmasq
//sudo systemctl stop dhcpcd

//sudo systemctl stop piwifi.service
//nodemon app.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const ard = require('./ArduinoController.js');
const allowOrigins = ['*'];
var lastIndex = 0;
var hostName = 'pi.wifi';

var ardControl = new ard.ArduinoController('/dev/serial0')
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(cors());

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use((req, res, next) => {
    next();
})

app.use(express.static('public'))

app.get('/', (req, res, next) => {
    res.send('This fefe a teshiuhiuh??t!!');
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

app.get('/getID', function(req, res) {
    res.status(200).send(lastIndex.toString());
    console.log(lastIndex);
    lastIndex++;
    if(lastIndex > 2)
    {
        lastIndex = 0;
    }
})

app.post('/sendRGB', function(req, res) {
    console.log("SALUT NOUVELLE FONCTION RGB OU QUOI LA");
    console.log(req.body.id);
    console.log(req.body.red);
    console.log(req.body.green);
    console.log(req.body.blue);

    ardControl.sendRgb(req.body.id, req.body.red, req.body.green, req.body.blue);
    res.redirect('/');
})


app.post('/sendBLINK', function(req, res) {
    console.log("SALUT NOUVELLE FONCTION RGB OU QUOI LA");
    console.log(req.body.id);
    console.log(req.body.red);
    console.log(req.body.green);
    console.log(req.body.blue);
    console.log(req.body.wait);

    ardControl.sendBlink(req.body.id, req.body.red, req.body.green, req.body.blue, req.body.wait);
    res.redirect('/');
})

app.post('/sendRAINBOW', function(req, res) {
    console.log("SALUT NOUVELLE FONCTION RGB OU QUOI LA");
    console.log(req.body.id);
    console.log(req.body.wait);

    ardControl.sendRainbow(req.body.id, req.body.wait);
    res.redirect('/');
})
