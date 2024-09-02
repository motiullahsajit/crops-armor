#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN 2       
#define DHTTYPE DHT22  
DHT_Unified dht(DHTPIN, DHTTYPE);

#define soilMoisturePin A0
#define waterLevelPin A1
#define ldrPin 8  
#define soundSensorPin A2 

#define waterLevelLED1 3
#define waterLevelLED2 4
#define waterLevelLED3 5
#define ldrLED 6
#define relayPin 7

#define pirPin 9  
#define buzzerPin 10  

LiquidCrystal_I2C lcd(0x27, 16, 2); 

int calibrationTime = 30;        

long unsigned int lowIn;         

long unsigned int pause = 5000;  

boolean lockLow = true;
boolean takeLowTime;  

unsigned long previousMillisSensors = 0;
unsigned long previousMillisLCD = 0;
unsigned long previousMillisLEDs = 0;
unsigned long previousMillisBuzzer = 0;
const long sensorInterval = 1000; 
const long lcdInterval = 2000;    
const long ledInterval = 100;     
const long buzzerDuration = 5000;  

float temperature = 0.0;
float humidity = 0.0;
int soilMoistureValue = 0;
int waterLevelValue = 0;
int ldrValue = 0;
int soundValue = 0;  
int pirValue = 0;  

const int numSamples = 10;
int soilMoistureSamples[numSamples];
int sampleIndex = 0;
bool motionDetected = false;

void setup() {
  pinMode(soilMoisturePin, INPUT);
  pinMode(waterLevelPin, INPUT);
  pinMode(ldrPin, INPUT);  
  pinMode(soundSensorPin, INPUT); 

  pinMode(waterLevelLED1, OUTPUT);
  pinMode(waterLevelLED2, OUTPUT);
  pinMode(waterLevelLED3, OUTPUT);
  pinMode(ldrLED, OUTPUT);
  pinMode(relayPin, OUTPUT);
  pinMode(pirPin, INPUT);
  pinMode(buzzerPin, OUTPUT);

  lcd.init();
  lcd.backlight();
  dht.begin();
  
  Serial.begin(9600);

  for (int i = 0; i < numSamples; i++) {
    soilMoistureSamples[i] = analogRead(soilMoisturePin);
  }

  digitalWrite(pirPin, LOW);

  Serial.print("calibrating sensor ");
  for(int i = 0; i < calibrationTime; i++){
    Serial.print(".");
    delay(1000);
  }
  Serial.println(" done");
  Serial.println("SENSOR ACTIVE");
  delay(50);
}

void loop() {
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillisSensors >= sensorInterval) {
    previousMillisSensors = currentMillis;

    int rawSoilMoisture = analogRead(soilMoisturePin);
    soilMoistureSamples[sampleIndex] = rawSoilMoisture;
    sampleIndex = (sampleIndex + 1) % numSamples;

    int total = 0;
    for (int i = 0; i < numSamples; i++) {
      total += soilMoistureSamples[i];
    }
    soilMoistureValue = total / numSamples;

    waterLevelValue = analogRead(waterLevelPin);
    ldrValue = digitalRead(ldrPin);
    soundValue = analogRead(soundSensorPin);  
    pirValue = digitalRead(pirPin);  

    sensors_event_t event;

    dht.temperature().getEvent(&event);
    temperature = event.temperature;
    
    dht.humidity().getEvent(&event);
    humidity = event.relative_humidity;

    String data = "{";
    data += "\"temperature\":" + String(temperature, 1) + ",";
    data += "\"humidity\":" + String(humidity, 1) + ",";
    data += "\"soilMoisture\":" + String(soilMoistureValue) + ",";
    data += "\"waterLevel\":" + String(waterLevelValue) + ",";
    data += "\"ldrValue\":\"" + String(ldrValue == HIGH ? "Dark" : "Light") + "\",";
    data += "\"soundFrequency\":" + String(soundValue) + ",";
    data += "\"pirValue\":" + String(pirValue);  
    data += "}";

    Serial.println(data);

    if (soilMoistureValue > 900) {
      digitalWrite(relayPin, HIGH);  
    } else {
      digitalWrite(relayPin, LOW);  
    }
  }

  if (currentMillis - previousMillisLCD >= lcdInterval) {
    previousMillisLCD = currentMillis;

    lcd.setCursor(0, 0);
    lcd.print("T:");
    lcd.print(temperature, 1); 
    lcd.print("C");

    lcd.setCursor(0, 1);
    lcd.print("H:");
    lcd.print(humidity, 1); 
    lcd.print("%");

    lcd.setCursor(10, 0); 
    lcd.print("M:");
    lcd.print(soilMoistureValue);

    lcd.setCursor(10, 1); 
    lcd.print("F:");
    lcd.print(soundValue);  
  }

  if (currentMillis - previousMillisLEDs >= ledInterval) {
    previousMillisLEDs = currentMillis;

    if (waterLevelValue < 300) {
      digitalWrite(waterLevelLED1, HIGH);
      digitalWrite(waterLevelLED2, LOW);
      digitalWrite(waterLevelLED3, LOW);
    } else if (waterLevelValue >= 300 && waterLevelValue < 400) {
      digitalWrite(waterLevelLED1, HIGH);
      digitalWrite(waterLevelLED2, HIGH);
      digitalWrite(waterLevelLED3, LOW);
    } else {
      digitalWrite(waterLevelLED1, HIGH);
      digitalWrite(waterLevelLED2, HIGH);
      digitalWrite(waterLevelLED3, HIGH);
    }

    if (ldrValue == HIGH) {
      digitalWrite(ldrLED, HIGH);  
    } else {
      digitalWrite(ldrLED, LOW); 
    }
  }

  if (digitalRead(pirPin) == HIGH) {
    if (lockLow) {
      lockLow = false;
      motionDetected = true;
      digitalWrite(buzzerPin, HIGH);
      previousMillisBuzzer = currentMillis;
      Serial.println("---");
      Serial.print("motion detected at ");
      Serial.print(millis()/1000);
      Serial.println(" sec"); 
    }
  } 

  if (motionDetected) {
    if (currentMillis - previousMillisBuzzer >= buzzerDuration) {
      motionDetected = false;
      digitalWrite(buzzerPin, LOW);
      lockLow = true; 
      Serial.print("motion ended at ");      
      Serial.print((millis() - pause)/1000);
      Serial.println(" sec");
    }
  }
}
