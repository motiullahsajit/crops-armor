const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const axios = require("axios");

const portPath = "COM4";
const baudRate = 9600;

const port = new SerialPort({ path: portPath, baudRate: baudRate });

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

parser.on("data", async (data) => {
  console.log("Received data from Arduino: ", data);

  try {
    const sensorData = JSON.parse(data);

    await axios.post("http://localhost:4000/api/sensors", sensorData);
    console.log("Data sent to server successfully");
  } catch (error) {
    console.error("Error processing data or sending to server:", error);
  }
});

port.on("error", (err) => {
  console.error("Serial port error:", err);
});
