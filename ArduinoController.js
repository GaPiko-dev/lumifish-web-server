const SerialPort = require('serialport')

/**
 * Handles arduino-related queries and commands.
 */
exports.ArduinoController = class {
  /**
   * Initializes Arduino controller.
   *
   * @class
   * @param {*} comPath - The path to the serial port.
   */
  constructor (comPath) {
    try {
      this.serial = new SerialPort(comPath, {
        baudRate: 115200,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        flowControl: false
      })

      this.flag = false;
      this.serial.on('data', function(data){
        console.log("data received : "  + data);
      });

    } catch (err) {
      console.error('Could not reach Arduino board at ' + comPath)
      process.exit()
    }
    
  }

  sendFct(fct)
  {
    let trame = "FCT|"+fct+"|!";
    console.log("ok");
      this.serial.write(trame);
  }
  // < "FCT", "id", "r", "g", "b" >
  sendRgb(id, red, green, blue)
  {
    if(this.flag == false)
    {
      console.log("changing " + id);
      this.flag = true;
      var self = this;
      this.serial.write(`<LED,${id},${red},${green},${blue}>\n`);
      this.serial.drain(()=>self.flag = false);
    }
  }

  sendBlink(id, red, green, blue, wait)
  {
    if(this.flag == false)
    {
      console.log("changing " + id);

      this.flag = true;
      var self = this;
      this.serial.write(`<BLINK,${id},${red},${green},${blue},${wait}>\n`);
      this.serial.drain(()=>self.flag = false);
    }
  }
  
  sendRainbow(id, wait)
  {
    if(this.flag == false)
    {
      console.log("changing " + id);

      this.flag = true;
      var self = this;
      this.serial.write(`<RAINBOW,${id},${wait}>\n`);
      this.serial.drain(()=>self.flag = false);
    }
  }

  sleep(milliseconds)
  {
    const date = Date.now();
    let currentDate = null;
    do
    {
      currentDate = Date.now();
    } while(currentDate - date < milliseconds);

    console.log("Hello");
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

}