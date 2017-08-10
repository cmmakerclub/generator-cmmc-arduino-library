#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <MqttConnector.h>

#include "init_mqtt.h"
#include "_publish.h"
#include "_receive.h"

MqttConnector *mqtt;

/* WIFI INFO */
String WIFI_SSID         = "MARUNET";
String WIFI_PASSWORD    = "ARCGlobe!1";

String MQTT_HOST        = "q.cmmc.io";
String MQTT_USERNAME    = "";
String MQTT_PASSWORD    = "";
String MQTT_CLIENT_ID   = "";
String MQTT_PREFIX      = "CMMC";
int    MQTT_PORT        = 2883;
int PUBLISH_EVERY       = 10000;

int relayPin            = 15;
int relayPinState;

String DEVICE_NAME = "AUG-NAT-001";
char myName[40];

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
