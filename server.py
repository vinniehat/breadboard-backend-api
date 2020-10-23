import json

from flask import Flask, url_for, request
from markupsafe import escape
from gpiozero import LED
from gpiozero.pins.pigpio import PiGPIOFactory
from time import sleep

port = 22  # GPIO Number
host = "192.168.1.23"
factory = PiGPIOFactory(host)
gpio = LED(port, pin_factory=factory)

app = Flask(__name__)


@app.route('/led/<status>', methods=['POST'])
def changeLED(status):
    if request.method == 'POST':
        if status == "on":
            gpio.on()
        elif status == "off":
            gpio.off()
        return {"Success": True}


@app.route('/led', methods=['GET'])
def led():
    if request.method == 'GET':
        isLit = "off"
        if gpio.is_lit:
            isLit = "on"
        return {"Success": True, "Status": isLit}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
