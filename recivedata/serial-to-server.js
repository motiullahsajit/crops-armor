const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline"); // Updated import
const axios = require("axios");

// Define the COM port explicitly
const portPath = "COM4"; // Ensure this is correct
const baudRate = 9600; // Baud rate for Arduino

// Initialize the serial port with the correct path and baud rate
const port = new SerialPort({ path: portPath, baudRate: baudRate });

// Create a parser to read the serial data line by line
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" })); // Updated constructor

// Handle incoming serial data
parser.on("data", async (data) => {
  console.log("Received data from Arduino: ", data);

  try {
    const sensorData = JSON.parse(data);

    // Send the data to the Node.js server
    await axios.post("http://localhost:4000/api/sensors", sensorData);
    console.log("Data sent to server successfully");
  } catch (error) {
    console.error("Error processing data or sending to server:", error);
  }
});

// Handle serial port errors
port.on("error", (err) => {
  console.error("Serial port error:", err);
});
