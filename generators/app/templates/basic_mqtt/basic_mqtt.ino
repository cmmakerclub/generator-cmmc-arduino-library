#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <MqttConnector.h>
#include <DHT.h>


#include "init_mqtt.h"
#include "_publish.h"
#include "_receive.h"

#define LED_BUILTIN <%= parseInt(ledPin, 10) %>

MqttConnector *mqtt;

char myName[40];
int relayPin            = <%= parseInt(relayPin, 10) %>;
int relayPinState;


/* WIFI INFO */
String WIFI_SSID        = "<%= wifiSsid %>";
String WIFI_PASSWORD    = "<%= wifiPassword %>";

String MQTT_HOST        = "<%= mqttHostName %>";
String MQTT_USERNAME    = "<%= mqttUserName %>";
String MQTT_PASSWORD    = "<%= mqttPassword %>";
String MQTT_CLIENT_ID   = "<%= mqttClientId %>";
String MQTT_PREFIX      = "<%= mqttPrefix %>";
int    MQTT_PORT        = <%= parseInt(mqttPort, 10) %>;
int PUBLISH_EVERY       = 1000L*<%= mqttPublishEverySeconds %>;

String DEVICE_NAME      = "<%= mqttDeviceName %>";

void init_hardware()
{
  pinMode(relayPin, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);

  // serial port initialization
  Serial.begin(115200);
  delay(10);
  Serial.println();
  Serial.println("Starting...");
}

void init_wifi() {
  WiFi.disconnect();
  delay(20);
  WiFi.mode(WIFI_STA);
  delay(50);
  const char* ssid =  WIFI_SSID.c_str();
  const char* pass =  WIFI_PASSWORD.c_str();
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.printf ("Connecting to %s:%s\r\n", ssid, pass);
    delay(300);
  }
  Serial.println("WiFi Connected.");
  digitalWrite(LED_BUILTIN, HIGH);
}

void setup()
{
  init_hardware();
  init_wifi();
  init_mqtt();
}

void loop()
{
  mqtt->loop();
}
