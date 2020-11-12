const Gpio = require('onoff').Gpio;
const express = require('express');
const app = express();
const port = 3000;
const gpio_pins = {
    led: 2
}

const led = new Gpio(gpio_pins.led, 'out');


// GET: /led/<status>
// Params: status
// Body: none
app.get('/led/:status/', (req, res) => {
    let newStatus = req.params.status;
    if (newStatus === "on") {
        newStatus = 1;
    } else if (newStatus === "off") {
        newStatus = 0;
    } else if (newStatus === "toggle") {
        let prevStatus = led.readSync();
        if (prevStatus === 0) {
            newStatus = 1;
        } else {
            newStatus = 0;
        }
    }
    if (newStatus === 0 || newStatus === 1) {
        led.writeSync(newStatus);
        if (newStatus === 0) {
            res.send("Turned off.");
        } else if (newStatus === 1) {
            res.send("Turned on.");
        }
    } else {
        res.sendStatus(400);
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})