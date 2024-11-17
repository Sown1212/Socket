#include <Arduino.h>
#include <WiFi.h>
#include <WebSocketsClient.h>

WebSocketsClient webSocket;

#define USE_SERIAL Serial

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {

	switch(type) {
		case WStype_DISCONNECTED:
			USE_SERIAL.printf("Disconnected!\n");
			break;
		case WStype_CONNECTED:
			USE_SERIAL.printf("Connected\n");
			break;
		case WStype_TEXT:
			
			break;
        default:
            break;
	}
}

void setup() {
	USE_SERIAL.begin(9600);

	WiFi.begin("ABB", "123123123");
	USE_SERIAL.printf("\nConnecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(100);
        USE_SERIAL.printf(".");
    }
    USE_SERIAL.printf("\nWiFi Connected!\n");
	webSocket.begin("192.168.22.59", 3000, "/");
	webSocket.onEvent(webSocketEvent);
}

unsigned long lastMessageTime = 0;
const unsigned long messageInterval = 5000;

void loop() {
	webSocket.loop();

    unsigned long currentMillis = millis();
    if (currentMillis - lastMessageTime >= messageInterval) {
        lastMessageTime = currentMillis;
        webSocket.sendTXT("{\"type\":\"message\", \"message\": \"ESP : Hi everybody\"}");
    }
}