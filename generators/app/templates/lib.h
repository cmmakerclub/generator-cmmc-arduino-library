#ifndef <%= className %>_H
#define <%= className %>_H

#include "ESP8266WiFi.h"
#include <functional>

#ifdef ESP8266
extern "C" {
#include "user_interface.h"
}
#endif


class <%= className %>
{
public:
 <%= className %>()
 {

 }
 ~<%= className %>()
 {
    
 }
 void setup() {

 }

};

#endif //<%= className %>_H
